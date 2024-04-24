function VideoPlayer({ videoUrl }) {
    if (!videoUrl) {
        return <div>Loading...</div>;
    }

    return (
        <div className="video-player">
            <video controls width="100%">
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    );
}
export default VideoPlayer;