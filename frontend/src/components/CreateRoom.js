import React, { useState } from 'react';
import createRoomApi from '../services/CreateRoomApi';
import { useNavigate } from 'react-router-dom';

const CreateRoom = () => {
    const [name, setName] = useState('');
    const [passkey, setPasskey] = useState('');
    const [nameError, setNameError] = useState(null);
    const [passkeyError, setPasskeyError] = useState(null);
    const navigate = useNavigate();

    const handleCreateRoom = async () => {
        const token = localStorage.getItem('token');
        const result = await createRoomApi(name, passkey, token);

        if (result.success) {
            console.log('Room created successfully');
            navigate('/Dashboard');
        } else {
            // const errorMessage = result.message || 'Failed to create room';

            if (result.name) {
                setNameError(result.name[0]);
            } else {
                setNameError(null);
            }

            if (result.passkey) {
                setPasskeyError(result.passkey[0]);
            } else {
                setPasskeyError(null);
            }

            console.log(result);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Create Room
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Room Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={`block w-full p-4 border ${
                                nameError ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        {nameError && <p className="text-red-500 text-sm">{nameError}</p>}
                    </div>
                    <div className="mb-4">
                        <input
                            type="text"
                            placeholder="Passkey"
                            value={passkey}
                            onChange={(e) => setPasskey(e.target.value)}
                            className={`block w-full p-4 border ${
                                passkeyError ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        {passkeyError && <p className="text-red-500 text-sm">{passkeyError}</p>}
                    </div>
                    {/* {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>} */}
                    <div>
                        <button
                            type="button"
                            onClick={handleCreateRoom}
                            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Create Room
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateRoom;
