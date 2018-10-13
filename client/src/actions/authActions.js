import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { GET_ERRORS,SET_CURRENT_USER } from './types';


//Register User 
export const registerUser = (userData, history) => dispatch => {
    axios.post('/api/user/register',userData)
            .then(res => history.push('/login'))
            .catch(err =>
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                })
            );
}

//Login User
export const loginUser = (userData) => dispatch => {
    axios.post('/api/user/login', userData)
        .then(res => {
            // save to localStorage
            const { token } = res.data;
            // set token to localStorage, local storage only store string
            localStorage.setItem("jwtToken", token);
            // set token to Auth Header
            setAuthToken(token);
            //decode token to get user data
            const decoded = jwt_decode(token);
            // Set current user
            dispatch(setCurrentUser(decoded));
        })
        .catch( err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            }))
}

//set logged in user:
export const setCurrentUser = (decoded) =>{
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    };
};

//Logout User:
export const logoutUser = () => dispatch => {
    // remove token from localStorage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    //set current user to an empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}))
}