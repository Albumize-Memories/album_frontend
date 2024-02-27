import React from 'react';

const SoundCloudEmbed = () => {
  // Hardcoded SoundCloud track URL
  const trackUrl = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/709137628';

  return (
    <div>
    <iframe 
         width="100%" 
         height="300" 
         scrolling="no" 
         frameborder="no" 
         allow="autoplay" 
         src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1276358503&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true">
    </iframe>
    </div>
  );
};

export default SoundCloudEmbed;