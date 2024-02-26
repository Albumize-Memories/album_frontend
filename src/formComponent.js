import React, { useState } from 'react';
import UploadMultipleComponent from './uploadMultipleComponent';

const FormComponent = ({ onSubmit }) => {
    const [type, setType] = useState('');
    const [tagline, setTagline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ type, tagline });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="type">Type:</label>
                <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Type</option>
                    <option value="travel">Travel</option>
                    <option value="gifting">Gifting</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="tagline">Tagline:</label>
                <input
                    type="text"
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Enter tagline"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

const UploadFormComponent = () => {
    const [showFileSelection, setShowFileSelection] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleFormSubmit = (data) => {
        setFormData(data);
        setShowFileSelection(true);
    };

    return (
        <div>
            {!showFileSelection ? (
                <FormComponent onSubmit={handleFormSubmit} />
            ) : (
                <div>
                    <h2>Selected Type: {formData.type}</h2>
                    <h2>Tagline: {formData.tagline}</h2>
                     <UploadMultipleComponent/>
                </div>
            )}
        </div>
    );
};

export default UploadFormComponent;
