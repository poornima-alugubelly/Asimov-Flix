import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useVideoListing } from "../../context/VideosListingContext";
import { VideoCard } from "./components/VideoCard";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { actionTypes } from "../../constants/actionTypes";
import { constants } from "../../constants/constants";
import { sortByDate } from "../../helpers/sortByDate";
import { getSearchedVideos } from "../../helpers/getSearchedVideos";
import { Loader } from "../../components/Loader/Loader";
import "./Explore.css";
export const Explore = () => {
	const { FILTER, SORT_VIDEOS } = actionTypes;
	const { NEWEST, OLDEST } = constants;
	const {
		videoListingState: {
			data,
			categories,
			selectedCategory,
			sortBy,
			searchText,
		},
		videoListingDispatch,
		videoListingLoader,
		videoListingError,
	} = useVideoListing();
	const navigate = useNavigate();
	videoListingError && navigate("/error");
	let videoList = [...data];

	if (searchText) {
		videoList = getSearchedVideos(videoList, searchText);
	}
	const filteredVideoList = selectedCategory
		? videoList.filter((item) => item.category === selectedCategory)
		: videoList;
	const finalVideoList = sortByDate(filteredVideoList, sortBy);

	const videoOptionsDispatchCall = (val) => {
		videoListingDispatch({ type: FILTER, payload: { category: val } });
	};
	const [sortOptions, setSortOptions] = useState(false);

	return !videoListingLoader ? (
		<div className="main-container">
			<AsideNav />

			<div>
				<div className="explore-subcontainer">
					<div className="flex-row">
						<span
							className={`chip ${selectedCategory ? "" : "chip-active"}`}
							onClick={() => videoOptionsDispatchCall("")}
						>
							All
						</span>
						{categories.map((category) => (
							<span
								className={`chip ${
									selectedCategory === category.categoryName
										? "chip-active"
										: ""
								}`}
								onClick={() => videoOptionsDispatchCall(category.categoryName)}
								key={category.id}
							>
								{category.categoryName}
							</span>
						))}
					</div>

					<div className="sort-wrapper">
						<div
							className="flex-row gap-xs flex-align-center text-s pointer"
							onClick={() => setSortOptions(!sortOptions)}
						>
							<i class="fas fa-sort"></i> <span>SORT</span>
						</div>
						{sortOptions && (
							<div className="sort-drawer">
								<ul className="list-container pointer">
									<li
										className="list-item"
										onClick={() =>
											videoListingDispatch({
												type: SORT_VIDEOS,
												payload: { sortBy: NEWEST },
											})
										}
									>
										Date Added (newest)
									</li>
									<li
										className="list-item"
										onClick={() =>
											videoListingDispatch({
												type: SORT_VIDEOS,
												payload: { sortBy: OLDEST },
											})
										}
									>
										Date Added (oldest)
									</li>
								</ul>
							</div>
						)}
					</div>
				</div>

				<div className="grid-autofill-layout">
					{finalVideoList?.map((video) => (
						<VideoCard key={video.id} video={video} />
					))}
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};
