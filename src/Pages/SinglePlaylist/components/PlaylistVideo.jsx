export const PlaylistVideo = ({ video }) => {
	return (
		<div class="card card-horizontal padding-s">
			<div class="img-container">
				<img src={video.thumbnail} alt="product image" class="img-responsive" />
			</div>
			<div className="card-content">
				<h3>{video.title}</h3>
				<span className="text-xs">{video.creator}</span>
			</div>
		</div>
	);
};
