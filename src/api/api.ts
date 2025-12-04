
import axios from 'axios';
import { User, Job, Application, Interview, Message, Notification } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = Bearer ${ token };
    }
    return config;
});

export const authAPI = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),
    register: (userData: any) =>
        api.post('/auth/register', userData),
    logout: () =>
        api.post('/auth/logout'),
};

export const jobAPI = {
    getJobs: (params?: any) =>
        api.get('/jobs', { params }),
    getJob: (id: string) =>
        api.get(/jobs/${ id }),
    createJob: (jobData: Partial<Job>) =>
        api.post('/jobs', jobData),
    updateJob: (id: string, jobData: Partial<Job>) =>
        api.put(/jobs/${ id }, jobData),
    deleteJob: (id: string) =>
        api.delete(/jobs/${ id }),
};

export const applicationAPI = {
    apply: (jobId: string, coverLetter: string) =>
        api.post('/applications', { jobId, coverLetter }),
    getApplications: (params?: any) =>
        api.get('/applications', { params }),
    updateApplicationStatus: (id: string, status: string) =>
        api.put(/applications/${ id } / status, { status }),
};

export const userAPI = {
    getProfile: () =>
        api.get('/users/profile'),
    updateProfile: (userData: Partial<User>) =>
        api.put('/users/profile', userData),
    uploadResume: (file: File) => {
        const formData = new FormData();
        formData.append('resume', file);
        return api.post('/users/resume', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
};

export const messageAPI = {
    getConversations: () =>
        api.get('/messages/conversations'),
    getMessages: (userId: string) =>
        api.get(/messages/${ userId }),
    sendMessage: (receiverId: string, content: string) =>
        api.post('/messages', { receiverId, content }),
};

export const notificationAPI = {
    getNotifications: () =>
        api.get('/notifications'),
    markAsRead: (id: string) =>
        api.put(/notifications/${ id } / read),
};

export default api;
