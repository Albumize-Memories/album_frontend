import React from 'react';

const YouTubeEmbedComponent = () => {
  // Hardcoded YouTube video URL
  const videoUrl = 'https://www.youtube.com/embed/PddEGvUFZDQ';

  return (
    <div>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTubeEmbedComponent;
