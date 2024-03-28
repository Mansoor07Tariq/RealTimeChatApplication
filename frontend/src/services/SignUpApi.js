const BASE_URL = 'http://localhost:8000/api';

const signupuser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/signup/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    return response;
};

export default signupuser;
