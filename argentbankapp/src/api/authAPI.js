import axios from 'axios';

export async function loginUser(loginData) {
    const response = await axios.post('http://localhost:3001/api/v1/user/login', {
        email: loginData.email,
        password: loginData.password,
    });
    return response.data;
}

export async function fetchUserProfile(token) {
    const response = await axios.post('http://localhost:3001/api/v1/user/profile', {}, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}

export async function updateUserName(token, userName) {
    const response = await axios.put('http://localhost:3001/api/v1/user/profile', { userName }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
}