import actionTypes from './actionTypes';
import { getSettingService, createNewUserService, getAllUsers } from '../../services/userService'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// })

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
                dispatch(saveUserSuccess())
            } else {
                dispatch(saveUserFailure());
            }
        } catch (e) {
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
