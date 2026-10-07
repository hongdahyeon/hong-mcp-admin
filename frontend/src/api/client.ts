import axios from 'axios';

/**
 * 🚀 Base Axios Instance
 * Interceptor가 적용되지 않은 순수 인스턴스입니다.
 */
const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default client;
