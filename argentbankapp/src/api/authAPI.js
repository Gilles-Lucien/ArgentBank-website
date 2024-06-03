import axios from 'axios';

const host = 'http://localhost:3001';

// Send a request to the API to log in the user
export async function loginUser(loginData) {
    const response = await axios.post(`${host}/api/v1/user/login`, {
        email: loginData.email,
        password: loginData.password,
    });
    return response.data;
}

// Send a request to the API to fetch the user profile
export async function fetchUserProfile(token) {
    const response = await axios.post(`${host}/api/v1/user/profile`, {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

// Send a request to the API to update the user name
export async function updateUserName(token, userName) {
    const response = await axios.put(`${host}/api/v1/user/profile`, { userName }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}