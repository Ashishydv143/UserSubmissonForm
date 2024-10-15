import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleUserPanelClick = () => {
        navigate('/');
    };

    return (
        
        <div className="min-h-screen bg-gray-100 p-6">
             <button
                onClick={handleUserPanelClick}
                className="mt-8 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
                Go to User Panel
            </button>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h2>
            <div className="grid gap-6">
                {users.map((user) => (
                    <div key={user._id} className="bg-white rounded-lg shadow-md p-4">
                        <h3 className="text-xl font-semibold text-gray-700">{user.name}</h3>
                        <p className="text-gray-500">@{user.socialHandle}</p>
                        <div className="flex flex-wrap gap-3 mt-4">
                            {user.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`http://localhost:5000/${image}`}
                                    alt="User submission"
                                    className="w-24 h-24 object-cover rounded-md border border-gray-200"
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
           
        </div>
    );
};

export default AdminDashboard;
