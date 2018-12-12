import * as types from '../actions/types';

const initialState = {
    formData: {},
    profile: [],
    fetching: true
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case types.ADD_PROFILE_REQUEST:
        case types.ADD_PROFILE_COMPLETE:
        case types.UPDATE_PROFILE_REQUEST:
        case types.UPDATE_PROFILE_COMPLETE:
        case types.FETCH_PROFILE_REQUEST:
            return { ...state, fetching: action.fetching };
        case types.FETCH_PROFILE_COMPLETE:
            return { ...state, profile: action.profile, fetching: action.fetching };
        default:
            return state;
    }
}

export default rootReducer;