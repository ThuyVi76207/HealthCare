import axios from '../axios';

const handleLoginApi = (email, password) => {
    return axios.post('/api/login', { email, password });
}

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`)
}

const createNewUserService = (data) => {
    return axios.post('/api/create-users', data)
}

const editUserService = (data) => {
    return axios.put('/api/edit-users', data)
}

const deleteUserService = (id) => {
    return axios.delete('/api/delete-users', {
        data: {
            id: id
        }
    });
}

const getSettingService = (type) => {
    return axios.get(`/api/settings?type=${type}`)
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getSettingService,
    getTopDoctorHomeService
}