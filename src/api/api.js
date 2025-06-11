import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
});

export const todoAPI = {
    async getTasks(limit = 10) {
        const response = await instance.get(`/todos?_limit=${limit}`);
        return response.data.map(task => ({
            id: task.id,
            task: task.title,
            completed: task.completed,
        }));
    },

    async createTask(taskText) {
        const response = await instance.post('/todos', {
            title: taskText,
            completed: false,
            userId: 1,
        });
        return {
            id: response.data.id,
            task: response.data.title,
            completed: response.data.completed,
        };
    },

    async updateTask(id, updates) {
        const response = await instance.patch(`/todos/${id}`, updates);
        return {
            id: response.data.id,
            task: response.data.title,
            completed: response.data.completed,
        };
    },

    async deleteTask(id) {
        await instance.delete(`/todos/${id}`);
        return id;
    },
};