import { useState, useEffect } from "react";
import "./PlaylistModal.css";
export const PlaylistModal = ({ val, setOpened }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [adding, setAdding] = useState(false);

	useEffect(() => setIsOpen(val));
	const items = ["Watch Later ", "Watch Later", "Watch Later"];
	return (
		<>
			{isOpen && (
				<div>
					<div className="overlay"></div>
					<div className="modal-centered playlist-modal holo-bg">
						<div className="padding-xxs flex-space-between">
							<span>Save to...</span>{" "}
							<i
								class="far fa-times-circle"
								onClick={() => {
									setIsOpen(false);
									setOpened(false);
								}}
							></i>
						</div>
						<ul className="playlist-modal-body">
							{items.map((item) => (
								<li className="text-center playlist-modal-item gap-s">
									<input type="checkbox" className="input-checkbox" /> {item}
								</li>
							))}
						</ul>
						{adding ? (
							<div className="flex-column gap-xs">
								<input className="input" placeholder="Enter Name" />
								<span className="txt-high-light pointer" role="button">
									<strong>CREATE</strong>
								</span>
							</div>
						) : (
							<div
								className="playlist-modal-item gap-xs"
								onClick={() => setAdding(true)}
							>
								<i class="fas fa-folder-plus"></i>
								<span className=" padding-xxs ">Create new playlist</span>
							</div>
						)}
					</div>
				</div>
			)}
		</>
	);
};
