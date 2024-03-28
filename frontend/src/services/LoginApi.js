const BASE_URL = 'http://localhost:8000/api';

const loginUser = async (username, password) => {
    const response = await fetch(`${BASE_URL}/login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    console.log(response)

    return response;
};

export default loginUser;
