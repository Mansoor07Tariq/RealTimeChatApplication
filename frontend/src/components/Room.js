import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomName } = useParams();
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const socketRef = useRef(null);

    useEffect(() => {
        // Establish WebSocket connection
        const socket = new WebSocket(`ws://localhost:8000/ws/chat/${parseInt(roomName)}/`);

        socketRef.current = socket;

        // Event handler for incoming messages
        socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log(data);
            setMessages((prevMessages) => [
                ...prevMessages,
                { user: { username: 'You' }, content: data.message },
            ]);
        };

        const token = localStorage.getItem('token');

        fetch(`http://localhost:8000/api/get-messages/${parseInt(roomName)}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setMessages(data);
            })
            .catch((error) => {
                console.error('Error fetching previous messages:', error);
            });

        // Clean up the WebSocket connection on component unmount
        return () => {
            socket.close();
        };
    }, [roomName]);

    const handleSendMessage = () => {
        if (!newMessage) {
            // Do not send empty messages
            return;
        }

        // Check if the WebSocket connection is open before sending a message
        if (socketRef.current.readyState === WebSocket.OPEN) {
            // Send message to the WebSocket server
            const userMessage = {
                message: newMessage,
                username: 'mansoor',
                room: 1,
            };
            socketRef.current.send(JSON.stringify(userMessage));
        }

        setNewMessage('');
    };

    return (
        <div>
            <h2 className="text-3xl font-extrabold">{roomName}</h2>
            <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                {messages.map((message, index) => (
                    <div key={index}>
                        <p>
                            <strong>{message.user.username}:</strong> {message.content}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="p-2 border rounded-md"
                />
                <button
                    onClick={handleSendMessage}
                    className="ml-2 p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Room;
