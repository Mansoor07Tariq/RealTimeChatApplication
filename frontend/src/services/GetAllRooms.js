const BASE_URL = 'http://localhost:8000/api';

const getAllRooms = async (token) => {
    try {
        const response = await fetch(`${BASE_URL}/get-all-rooms/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Token ${token}`,
            },
        });

        if (response.ok) {
            const data = await response.json();
            return { success: true, rooms: data };
        } else {
            return { success: false, message: 'Failed to fetch rooms' };
        }
    } catch (error) {
        console.error('Error fetching rooms:', error);
        return { success: false, message: 'An error occurred while fetching rooms.' };
    }
};

export default getAllRooms;
