// RoomList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RoomList = ({ rooms }) => {
    const navigate = useNavigate();

    const handleRoomClick = (roomName) => {
        navigate(`/room/${roomName}`);
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">All Rooms</h3>
            <ul>
                {rooms.map((room) => (
                    <li
                        key={room.id}
                        className="border p-3 mb-2 rounded-md cursor-pointer"
                        onClick={() => handleRoomClick(room.id)}
                    >
                        <Link to={`/room/${room.name}`}>
                            <h4 className="text-lg font-semibold">{room.name}</h4>
                        </Link>
                        <p className="text-gray-500">ID: {room.id}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RoomList;
