// src/components/UploadComponent.js
import React, { useState } from 'react';
import axios from 'axios';

const UploadComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };

    const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            console.log(`File ${index}:`, file);
            formData.append(`file${index}`, file);
            console.log(formData);
        });

        try {
            await axios.post('http://127.0.0.1:5000/uploadImages', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading files: ', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} multiple/>
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
};

export default UploadComponent;
