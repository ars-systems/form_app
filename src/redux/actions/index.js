import * as types from './types';
import axios from 'axios';

export const fetchProfileRequest = () => {
    return { type: types.FETCH_PROFILE_REQUEST, fetching: true };
}

export const fetchProfileAction = profile => {
    return { type: types.FETCH_PROFILE_COMPLETE, profile, fetching: false };
}

export const addProfileRequest = () => {
    return { type: types.ADD_PROFILE_REQUEST, fetching: true };
}

export const addProfileComplete = () => {
    return { type: types.ADD_PROFILE_COMPLETE, fetching: false };
}

export const updateProfileRequest = () => {
    return { type: types.UPDATE_PROFILE_REQUEST, fetching: true };
}

export const updateProfileComplete = () => {
    return { type: types.UPDATE_PROFILE_COMPLETE, fetching: false };
}

export const fetchProfile = () => dispatch => {
    dispatch(fetchProfileRequest());
    return axios.get('http://localhost:4000/get_json').then(res => {
        dispatch(fetchProfileAction(res.data));
    });
}

export const postProfile = data => dispatch => {
    dispatch(addProfileRequest());
    return axios.post('http://localhost:4000/add',data).then(() => {
        dispatch(addProfileComplete());
    });
}

export const profileUpdate = data => dispatch => {
    dispatch(updateProfileRequest());
    return axios.post('http://localhost:4000/update',data).then(() => {
        dispatch(updateProfileComplete());
    });
}