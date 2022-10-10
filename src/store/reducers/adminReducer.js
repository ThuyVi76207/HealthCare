import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: [],

}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state }
            copyState.genders = action.data;
            return {
                ...copyState,
            }
        case actionTypes.FETCH_GENDER_FAILURE:
            state.genders = []
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILURE:
            state.positions = []
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILURE:
            state.roles = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILURE:
            state.users = []
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.dataDoctors
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAILURE:
            state.topDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.allDoctors = action.dataDr;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAILURE:
            state.allDoctors = []
            return {
                ...state,
            }
        case actionTypes.FETCH_SETTINGS_SCHEDULE_HOURS_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_SETTINGS_SCHEDULE_HOURS_FAILURE:
            state.allScheduleTime = []
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;