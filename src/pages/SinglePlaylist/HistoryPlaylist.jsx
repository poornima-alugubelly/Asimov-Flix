import { AsideNav } from "../../components/AsideNav/AsideNav";
import { PlaylistVideo } from "./components/PlaylistVideo";
import { useUserData } from "../../context/UserDataContext";
import { Loader } from "../../components/Loader/Loader";
import { useCustomPlaylist } from "../../hooks/useCustomPlaylist";
import { actionTypes } from "../../constants/actionTypes";
import { removeAllHistoryService } from "../../services/history-services";
export const HistoryPlaylist = () => {
	const {
		userData: { history },
		historyLoading,
	} = useUserData();

	const { SET_HISTORY } = actionTypes;

	const [clearHistoryServerCall] = useCustomPlaylist(
		removeAllHistoryService,
		history,
		SET_HISTORY,
		"Cleared History"
	);

	return !historyLoading ? (
		<div className="main-container">
			<AsideNav />

			<div className="padding-l">
				<div className="flex-row gap-xl flex-align-center ">
					<h2>History</h2>
					<span
						className=" pointer  link-text"
						onClick={() => clearHistoryServerCall()}
					>
						Clear Watch History
					</span>
				</div>

				<div className="padding-tp-btm-s">
					{history.length === 0 ? (
						<h3>No Videos watched...</h3>
					) : (
						history.map((video) => (
							<PlaylistVideo video={video} playlistTitle="History" />
						))
					)}
				</div>
			</div>
		</div>
	) : (
		<Loader />
	);
};
