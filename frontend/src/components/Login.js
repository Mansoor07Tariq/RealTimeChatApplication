import React, { useState } from 'react';
import loginUser from '../services/LoginApi';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate(); // Hook for navigation

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError('Please enter both username and password.');
            return;
        }

        try {
            const response = await loginUser(username, password);

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // assuming your API returns a token
                // localStorage.setItem('userID', data.); // assuming your API returns a token
                console.log(data)
                console.log('Login successful', data);
                navigate('/dashboard'); // Redirect to dashboard or any other page
            } else {
                console.error('Login failed');
                setError('Invalid username or password.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            setError('An error occurred during login. Please try again.');
        }
    };

    const navigateToSignup = () => {
        navigate('/signup'); // Redirect to signup page
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Login
                    </h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className={`block w-full p-4 border ${
                                error && !username ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`block w-full p-4 border ${
                                error && !password ? 'border-red-500' : 'border-gray-300'
                            } rounded-md`}
                        />
                    </div>
                    {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Login
                        </button>
                    </div>
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={navigateToSignup}
                            className="text-blue-500 hover:underline"
                        >
                            Don't have an account? Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
