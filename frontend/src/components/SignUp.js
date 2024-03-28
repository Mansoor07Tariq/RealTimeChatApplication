import React, { useState } from 'react';
import signupuser from '../services/SignUpApi';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate = useNavigate(); // Hook for navigation

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [responseError, setResponseError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            // Reset previous errors
            setUsernameError('');
            setPasswordError('');
            setResponseError('');

            // Validate fields
            if (!username) {
                setUsernameError('Please enter your username.');
                return;
            }

            if (!password) {
                setPasswordError('Please enter your password.');
                return;
            }

            const response = await signupuser(username, password);

            if (response.ok) {
                console.log('Signup successful');
                navigate('/login'); // Redirect to login page
            } else {
                console.error('Signup failed');
                const responseData = await response.json();
                setResponseError(responseData.message || 'An error occurred.');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            setResponseError('An error occurred. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Sign Up
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSignUp}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`block w-full p-4 border ${
                                usernameError ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        {usernameError && (
                            <div className="text-red-500 text-sm mt-1">{usernameError}</div>
                        )}
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`block w-full p-4 border ${
                                passwordError ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                        {passwordError && (
                            <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                        )}
                    </div>
                    {responseError && (
                        <div className="text-red-500 text-sm mt-2">{responseError}</div>
                    )}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
