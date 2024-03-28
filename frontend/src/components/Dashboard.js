// Dashboard.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import RoomList from './RoomList';

const Dashboard = () => {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState([]);

    const handleCreateRoom = () => {
        navigate('/createroom');
    };

    useEffect(() => {
        const fetchRooms = async () => {
            const token = localStorage.getItem('token');

            try {
                const response = await axios.get('http://localhost:8000/api/get-all-rooms/', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Token ${token}`,
                    },
                });

                if (response.status === 200) {
                    setRooms(response.data);
                } else {
                    console.error('Failed to fetch rooms');
                }
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };

        fetchRooms();
    }, []); // Run this effect only once on component mount

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Dashboard
                    </h2>
                </div>
                <div>
                    <button
                        type="button"
                        onClick={handleCreateRoom}
                        className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        Create Room
                    </button>
                </div>
                <div className="mt-8">
                    <RoomList rooms={rooms} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
