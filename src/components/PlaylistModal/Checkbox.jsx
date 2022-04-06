import { addToPlaylistService } from "../../services/playlist-services";
import { removeFromPlaylistService } from "../../services/playlist-services";
import { actionTypes } from "../../constants/actionTypes";
import { useCustomPlaylist } from "../../hooks/useCustomPlaylist";

export const CheckBox = ({ exists, playlist, video }) => {
	const { SET_PLAYLIST } = actionTypes;
	const [addToPlaylistServiceCall] = useCustomPlaylist(
		addToPlaylistService,
		playlist,
		SET_PLAYLIST,
		`Added to ${playlist.title}`,
		video
	);
	const [removeFromPlaylistServerCall] = useCustomPlaylist(
		removeFromPlaylistService,
		playlist,
		SET_PLAYLIST,
		`Removed from ${playlist.title}`,
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
