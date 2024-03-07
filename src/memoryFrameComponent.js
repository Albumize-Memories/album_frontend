import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using Axios for API calls

const CreateMemoryFrame = () => {
  const [photo, setPhoto] = useState(null);
  const [videoAudio, setVideoAudio] = useState(null);
  const [caption, setCaption] = useState('');

  const handlePhotoChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type.startsWith('image/')) {
      setPhoto(selectedFile);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleVideoAudioChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/'))) {
      setVideoAudio(selectedFile);
    } else {
      alert('Please select a valid video or audio file.');
    }
  };

  const handleCaptionChange = (event) => {
    setCaption(event.target.value);
  };

  const handleSubmit = async (event) => {
    const sessionId = localStorage.getItem('sessionId');
    event.preventDefault();

    const formData = new FormData();
    formData.append('photo', photo);
    formData.append('videoAudio', videoAudio);
    formData.append('caption', caption);

    try {
      const response = await axios.post('http://127.0.0.1:5000/generateMemoryFrame', formData, {
        headers: {
          // Set any necessary headers based on your backend API requirements
          'Content-Type': 'multipart/form-data',
          'Session-Token': sessionId
        },
      });
      console.log('API response:', response);
      // Handle successful submission (e.g., display a success message)
    } catch (error) {
      console.error('API error:', error);
      // Handle API errors (e.g., display an error message)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="photo">Photo:</label>
      <input type="file" id="photo" accept="image/*" onChange={handlePhotoChange} />
      <br />

      <label htmlFor="videoAudio">Video/Audio:</label>
      <input type="file" id="videoAudio" accept="video/*,audio/*" onChange={handleVideoAudioChange} />
      <br />

      <label htmlFor="caption">Caption:</label>
      <textarea id="caption" value={caption} onChange={handleCaptionChange} />
      <br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateMemoryFrame;
