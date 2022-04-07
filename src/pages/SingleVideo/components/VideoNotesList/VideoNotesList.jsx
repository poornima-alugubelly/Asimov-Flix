import { VideoNotesItem } from "./VideoNotesItem";

export const VideoNotesList = ({ vidNotesList, video }) => {
	return (
		<>
			{vidNotesList?.map((vidNotesItem) => (
				<VideoNotesItem vidNotesItem={vidNotesItem} video={video} />
			))}
		</>
	);
};
