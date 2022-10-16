import actionTypes from './actionTypes';
import {
    getSettingService,
    createNewUserService,
    getAllUsers,
    deleteUserService,
    editUserService,
    getTopDoctorHomeService,
    getAllDoctors,
    saveDetailDoctorService,
} from '../../services/userService'
import { toast } from 'react-toastify';

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getSettingService("GENDER");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data))
            } else {
                dispatch(fetchGenderFailure());
            }
        } catch (e) {
            dispatch(fetchGenderFailure());
            console.log(e);
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
})

export const fetchGenderFailure = () => ({
    type: actionTypes.FETCH_GENDER_FAILURE,
})

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getSettingService("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data))
            } else {
                dispatch(fetchPositionFailure());
            }
        } catch (e) {
            dispatch(fetchPositionFailure());
            console.log(e)
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
})

export const fetchPositionFailure = () => ({
    type: actionTypes.FETCH_POSITION_FAILURE
})

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getSettingService("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data))
            } else {
                dispatch(fetchRoleFailure());
            }
        } catch (e) {
            dispatch(fetchRoleFailure());
            console.log(e)
        }
    }
}


export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
})

export const fetchRoleFailure = () => ({
    type: actionTypes.FETCH_ROLE_FAILURE
})


export const createNewUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Create a new user successfully!!")
                dispatch(saveUserSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(saveUserFailure());
            }
        } catch (e) {
            toast.error("Error create a user!!")
            dispatch(saveUserFailure());
            console.log(e)
        }
    }
}

export const saveUserSuccess = (roleData) => ({
    type: actionTypes.SAVE_USER_SUCCESS,
})

export const saveUserFailure = () => ({
    type: actionTypes.SAVE_USER_FAILURE
})


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllUsers("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users.reverse()));
            } else {
                dispatch(fetchAllUsersFailure());
            }
        } catch (e) {
            dispatch(fetchAllUsersFailure());
            console.log(e)
        }
    }
}

export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: data
})

export const fetchAllUsersFailure = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAILURE
})


export const deleteUser = (userId) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(userId);
            if (res && res.errCode === 0) {
                toast.success("Delete a user successfully!!")
                dispatch(deleteUsersSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(deleteUsersFailure());
            }
        } catch (e) {
            toast.error("Error delete a user!!")
            dispatch(deleteUsersFailure());
            console.log(e)
        }
    }
}

export const deleteUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})

export const deleteUsersFailure = () => ({
    type: actionTypes.DELETE_USER_FAILURE
})

export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await editUserService(data);
            if (res && res.errCode === 0) {
                toast.success("Update a user successfully!!")
                dispatch(editUsersSuccess())
                dispatch(fetchAllUsersStart());
            } else {
                dispatch(editUsersFailure());
            }
        } catch (e) {
            toast.error("Error update a user!!")
            dispatch(editUsersFailure());
            console.log(e)
        }
    }
}

export const editUsersSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const editUsersFailure = () => ({
    type: actionTypes.DELETE_USER_FAILURE
})

export const fetchTopDoctor = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctorHomeService('10');
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
                    dataDoctors: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_TOP_DOCTORS_FAILURE
                })
            }
        } catch (e) {
            console.error(e)
            dispatch({
                type: actionTypes.FETCH_TOP_DOCTORS_FAILURE
            })
        }
    }
}
export const fetchAllDoctors = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
                    dataDr: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_ALL_DOCTORS_FAILURE
                })
            }
        } catch (e) {
            console.error(e)
            dispatch({
                type: actionTypes.FETCH_ALL_DOCTORS_FAILURE
            })
        }
    }
}

export const fetchAllScheduleHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getSettingService("TIME");
            if (res && res.errCode === 0) {
                dispatch({
                    type: actionTypes.FETCH_SETTINGS_SCHEDULE_HOURS_SUCCESS,
                    dataTime: res.data
                })
            } else {
                dispatch({
                    type: actionTypes.FETCH_SETTINGS_SCHEDULE_HOURS_FAILURE
                })
            }
        } catch (e) {
            console.error(e)
            dispatch({
                type: actionTypes.FETCH_SETTINGS_SCHEDULE_HOURS_FAILURE
            })
        }
    }
}

export const getRequiredDoctorInfor = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START })
            let resPrice = await getSettingService("PRICE");
            let resPayment = await getSettingService("PAYMENT");
            let resProvince = await getSettingService("PROVINCE");

            if (resPrice && resPrice.errCode === 0
                && resPayment && resPayment.errCode === 0
                && resProvince && resProvince.errCode === 0) {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data
                }
                dispatch(fetchRequiredDoctorInforSuccess(data))
            } else {
                dispatch(fetchRequiredDoctorInforFailure());
            }
        } catch (e) {
            dispatch(fetchRequiredDoctorInforFailure());
            console.log(e);
        }
    }
}

export const fetchRequiredDoctorInforSuccess = (data) => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: data
})

export const fetchRequiredDoctorInforFailure = () => ({
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILURE,
})

export const saveDetailDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveDetailDoctorService(data);
            console.log('TestSave:', res);
            if (res && res.errCode === 0) {

                toast.success("Save Infor Detail Doctor successfully!!")

                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            } else {
                toast.error("Save Infor Detail Doctor error!!")
                dispatch({
                    type: actionTypes.SAVE_DETAIL_DOCTOR_FAILURE
                })
            }
        } catch (e) {
            toast.error("Save Infor Detail Doctor error!!")
            console.error('SAVE_DETAIL_DOCTORS_FAILURE', e)
            dispatch({
                type: actionTypes.SAVE_DETAIL_DOCTOR_FAILURE
            })
        }
    }
}
