import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Footer} from './Footer'

const MemoryFrameComponentTwo = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [windowHeight, setWindowHeight] = useState(window.innerHeight);
    const [image, setImage] = useState(null);
    const [media, setMedia] = useState(null);
    const [text, setText] = useState('');

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            setWindowHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const aspectRatio = 16 / 9; // Desired aspect ratio
    const screenWidth = Math.min(windowWidth, windowHeight * aspectRatio);
    const screenHeight = screenWidth / aspectRatio;
    const scale = screenWidth / 1500;

    const handleImageUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setImage(selectedFile);
        } else {
          alert('Please select a valid image file.');
        }
      };
    

    const handleMediaUpload = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile && (selectedFile.type.startsWith('video/') || selectedFile.type.startsWith('audio/'))) {
            setMedia(selectedFile);
        } else {
          alert('Please select a valid video or audio file.');
        }
      };
    

    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleSubmit = async (event) => {
        const sessionId = localStorage.getItem('sessionId');
        event.preventDefault();
    
        const formData = new FormData();
        formData.append('photo', image);
        formData.append('videoAudio', media);
        formData.append('caption', text);
    
        try {
          const response = await axios.post('http://54.85.70.9:5000/generateMemoryFrame', formData, {
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

       <div style={{ width: '100%', height: '100%', border: '10px solid black', boxSizing: 'border-box', overflow: 'hidden', marginBottom: '100px' , backgroundColor: 'FFD8B1' }}>
    <div style={{ width: '100%', paddingTop: `${aspectRatio * 100}%`, position: 'relative' }}>
        {/* Custom static image for brown rectangle */}
        <div style={{ position: 'absolute', width: `${1080 * scale}px`, height: `${1440 * scale}px`, left: `${210 * scale}px`, top: `${105 * scale}px`, border: `${2 * scale}px solid black` }}>
            <img src="https://i.pinimg.com/originals/c7/ea/f1/c7eaf12850329ad6889b1c859b6133d1.jpg" alt="Brown Image" style={{ width: '100%', height: '100%' }} />
            <input type="file" onChange={handleImageUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
            <button onClick={() => document.querySelector('#imageInput').click()} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Upload Image</button>
        </div>

        {/* Custom static image for blue square */}
        <div style={{ position: 'absolute', width: `${225 * scale}px`, height: `${225 * scale}px`, left: `${140 * scale}px`, top: `${1600 * scale}px`, border: `${2 * scale}px solid black` }}>
            <img src="https://i.pinimg.com/originals/7f/23/5d/7f235d54f82c82a1449960f8a268e347.jpg" alt="Blue Image" style={{ width: '100%', height: '100%' }} />
            <input type="file" onChange={handleMediaUpload} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0 }} />
            <button onClick={() => document.querySelector('#mediaInput').click()} style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', zIndex: 1 }}>Upload Media</button>
        </div>

        {/* Text box */}
        <div style={{ position: 'absolute', width: `${900 * scale}px`, height: `${225 * scale}px`, left: `${(140 + 225 + 20) * scale}px`, top: `${1600 * scale}px`, backgroundColor: 'white', border: `${2 * scale}px solid #123456`, boxSizing: 'border-box' }}>
            <textarea style={{ width: '100%', height: '90%', padding: `${5 * scale}px`, boxSizing: 'border-box', fontSize: `${30 * scale}px`, border: 'none' }} placeholder="Enter Your memories here"> </textarea>
        </div>

        {/* Text */}
        <div style={{ fontFamily: 'Brush Script MT', fontSize: `${30 * scale}px`, position: 'absolute', left: `${(140 + 225 + 20) * scale}px`, top: `${1600 * scale}px`, color: 'black', textAlign: 'left' }}>
            {text}
        </div>

        {/* File input */}
        <input id="imageInput" type="file" onChange={handleImageUpload} style={{ display: 'none' }} accept="image/*" />
        <input id="mediaInput" type="file" onChange={handleMediaUpload} style={{ display: 'none' }} accept="video/*,audio/*"/>
    </div>
    <Footer/>
    {/* Bottom buttons */}
    <div style={{ position: 'fixed', width: '100%', bottom: 0, display: 'flex', backgroundColor: 'white', zIndex: 2 }}>
        <button style={{ flex: 1, height: '50px', backgroundColor: 'lightblue', border: 'none' }}>Reset</button>
        <button style={{ flex: 1, height: '50px', backgroundColor: 'lightgreen', border: 'none' }} onClick={handleSubmit} >Proceed</button>
    </div>
</div>
    )
};

export default MemoryFrameComponentTwo;
