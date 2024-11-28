import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 替换为你的API地址

export const getWelcomeMessage = async () => {
    const response = await axios.get(`${API_URL}/`);
    return response.data;
};

// 其他API请求可以在这里添加
