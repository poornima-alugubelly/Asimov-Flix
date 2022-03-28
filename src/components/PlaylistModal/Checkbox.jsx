import { addToPlaylistService } from "../../services/playlist-services";
import { removeFromPlaylistService } from "../../services/playlist-services";
import { actionTypes } from "../../reducers/actionTypes";
import { useCustomPlaylist } from "../../hooks/useCustomPlaylist";

export const CheckBox = ({ exists, playlist, video }) => {
	console.log("exists", exists);
	const { SET_PLAYLIST } = actionTypes;
	const [addToPlaylistServiceCall] = useCustomPlaylist(
		addToPlaylistService,
		playlist,
		SET_PLAYLIST,
		video
	);
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylistService,
		playlist,
		SET_PLAYLIST,
		video
	);
	const checkBoxHandler = () => {
		exists ? removeFromPlaylistServerCall() : addToPlaylistServiceCall();
	};
	return (
		<input
			type="checkbox"
			className="input-checkbox"
			checked={exists?.id === video.id}
			onChange={() => checkBoxHandler(exists, playlist)}
		/>
	);
};
