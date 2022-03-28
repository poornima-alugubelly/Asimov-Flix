import { useVideoListing } from "../../context/VideosListingContext";
import { VideoCard } from "./components/VideoCard";
import { AsideNav } from "../../components/AsideNav/AsideNav";
import { actionTypes } from "../../reducers/actionTypes";
import "./Explore.css";
export const Explore = () => {
	const { FILTER } = actionTypes;
	const {
		videoListingState: { data, categories, selectedCategory },
		videoListingDispatch,
	} = useVideoListing();
	const videoList = selectedCategory
		? data.filter((item) => item.category === selectedCategory)
		: data;
	const dispatchCall = (val) => {
		console.log(val);
		videoListingDispatch({ type: FILTER, payload: { category: val } });
	};

	return (
		<div className="main-container">
			<AsideNav />

			<div>
				<div className=" chip-container">
					<span
						className={`chip ${selectedCategory ? "" : "chip-active"}`}
						onClick={() => dispatchCall("")}
					>
						All
					</span>
					{categories.map((category) => (
						<span
							className={`chip ${
								selectedCategory === category.categoryName ? "chip-active" : ""
							}`}
							onClick={() => dispatchCall(category.categoryName)}
							key={category.id}
						>
							{category.categoryName}
						</span>
					))}
				</div>

				<div className="grid-autofill-layout">
					{videoList?.map((video) => (
						<VideoCard key={video.id} video={video} />
					))}
				</div>
			</div>
		</div>
	);
};
