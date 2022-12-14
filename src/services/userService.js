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

const getAllDoctors = () => {
    return axios.get(`/api/get-all-doctors`)
}

const saveBulkSchedudeDoctors = (data) => {
    return axios.post(`/api/bulk-create-schedule`, data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-infor-doctors', data)
}

const getDetailInforDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`)
}
const createNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-specialty`)
}

const getExtraDoctorInforById = (doctorId) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${doctorId}`)
}

const postPatientBooking = (data) => {
    return axios.post('/api/patient-booking-appointment', data)
}

const postVerifyBooking = (data) => {
    return axios.post('/api/verify-booking-appointment', data)
}

const getAllPatientDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`, data)
}

const postSendPrescription = (data) => {
    return axios.post(`/api/send-prescription`, data)
}

const postSendSMS = (data) => {
    return axios.post(`/api/sendSMS`, data)
}

const getAllSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`)
}
const createNews = (data) => {
    return axios.post(`/api/create-news`, data)
}
const getAllNews = () => {
    return axios.get(`/api/get-news`)
}
const getAllNewsById = (data) => {
    return axios.get(`/api/get-detail-news-by-id?id=${data.id}&location=${data.location}`)
}

export {
    handleLoginApi,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getSettingService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveBulkSchedudeDoctors,
    getScheduleDoctorByDate,
    saveDetailDoctorService,
    getDetailInforDoctor,
    createNewSpecialty,
    getAllSpecialty,
    getExtraDoctorInforById,
    getProfileDoctorById,
    postPatientBooking,
    postVerifyBooking,
    getAllPatientDoctor,
    postSendPrescription,
    postSendSMS,
    getAllSpecialtyById,
    createNews,
    getAllNews,
    getAllNewsById,
}