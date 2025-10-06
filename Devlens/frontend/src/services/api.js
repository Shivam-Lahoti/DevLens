import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const explainPage = async (url) => {
  try {
    const response = await apiClient.post('/api/v1/explain-page', { url });
    return response.data;
  } catch (error) {
    console.error('Error explaining page:', error);
    throw error;
  }
};

export const explainCode = async (code, language) => {
  try {
    const response = await apiClient.post('/api/v1/explain-code', { code, language });
    return response.data;
  } catch (error) {
    console.error('Error explaining code:', error);
    throw error;
  }
};

export const sendChatMessage = async (message, context) => {
  try {
    const response = await apiClient.post('/api/v1/chat', { message, context });
    return response.data;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
};

export const healthCheck = async () => {
  try {
    const response = await apiClient.get('/api/v1/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default apiClient;