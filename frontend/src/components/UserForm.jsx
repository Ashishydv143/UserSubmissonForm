import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [socialHandle, setSocialHandle] = useState('');
    const [images, setImages] = useState([]);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialHandle', socialHandle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            await axios.post('http://localhost:5000/api/submit', formData);
            alert('Submission successful!');
            setName('');
            setSocialHandle('');
            setImages([]);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleAdminClick = () => {
        navigate('/admin');
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">User Submission Form</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="text"
                    placeholder="Social Media Handle"
                    value={socialHandle}
                    onChange={(e) => setSocialHandle(e.target.value)}
                    required
                    className="w-full p-2 border border-gray-300 rounded-md"
                />
                <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    required
                    className="w-full p-2"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                    Submit
                </button>
            </form>
            <button
                onClick={handleAdminClick}
                className="mt-4 bg-green-500 text-white p-2 rounded-md"
            >
                Go to Admin Panel
            </button>
        </div>
    );
};

export default UserForm;
