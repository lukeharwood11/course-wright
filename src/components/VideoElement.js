import React from "react";

const VideoElement = (props) => {
    const getVideo = () => {
        return  <iframe className="mb-10 mt-10" width="560" height="315" src="https://www.youtube.com/embed/OoQLoKHhohg"
                        title="YouTube video player" frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen></iframe>
    }
    return (
        <></>
    );
}

export default VideoElement;