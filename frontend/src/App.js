import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import CreateRoom from './components/CreateRoom';
import Room from './components/Room';

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/createroom" element={<CreateRoom />} />
                <Route path="/room/:roomName" element={<Room />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
