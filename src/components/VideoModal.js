// components/VideoModal.js
import React from 'react';

const VideoModal = ({ movie, onClose }) => {
	return (
		<div className="video-modal">
			<div className="video-modal-content">
				<span className="close-button" onClick={onClose}>
					&times;
				</span>
				<iframe
					width="560"
					height="315"
					src={movie.trailerUrl}
					title="Movie Trailer"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			</div>
		</div>
	);
};

export default VideoModal;
