
import axios from 'axios';
import { GET_ERRORS,CLEAR_CURRENT_PROFILE, GET_PROFILE, PROFILE_LOADING, SET_CURRENT_USER } from './types';

//Delete account & profile:
export const deleteAccount = ()=> dispatch =>{
    if (window.confirm(" Are you sure ?")){

    }
    axios.delete("/api/profile")
        .then(res => dispatch({
            type: SET_CURRENT_USER,
            payload : {}
        }) )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//Get current profile
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    axios.get('/api/profile')
        .then(res => dispatch({
            type: GET_PROFILE,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_PROFILE,
            payload: {}
        }))
}

// Profile loading
export const setProfileLoading = () =>{
    return {
        type: PROFILE_LOADING,
    }
}

// Clear the profile once logout
export const clearCurrentProfile = () =>{
    return {
        type: CLEAR_CURRENT_PROFILE
    };
}

// Create profile
export const createProfile = (profileData,history) => dispatch => {
    axios
        .post('/api/profile',profileData)
        .then(res => history.push("/dashboard"))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data 
        }))
}
