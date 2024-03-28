const BASE_URL = 'http://localhost:8000/api';

const createRoomApi = async (name, passkey, token) => {
    try {
        const response = await fetch(`${BASE_URL}/create-room/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
            body: JSON.stringify({ name, passkey }),
        });

        if (response.ok) {
            return { success: true };
        } else {
            const data = await response.json();
            console.log(data)
            return { success: false, name: data.name , passkey: data.passkey};
        }
    } catch (error) {
        console.error('Error creating room:', error);
        return { success: false, message: 'An error occurred while creating the room.' };
    }
};

export default createRoomApi;
