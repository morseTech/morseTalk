import axios from 'axios';

const API_URL = 'http://localhost:3000'; // 替换为你的API地址

export const getMessages = async () => {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
};

// 其他API请求可以在这里添加

export const saveMessage = async (message) => {
    try {
        const response = await axios.post(`${API_URL}/post`, message);
        return response.data;
    } catch (error) {
        console.error('保存消息失败:', error);
        throw error;
    }
};
