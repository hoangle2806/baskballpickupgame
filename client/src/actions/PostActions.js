
import axios from 'axios';
import {ADD_POST, GET_ERRORS, GET_POSTS, POST_LOADING, DELETE_POST} from './types';

// Add Post
export const addPost = (postData) => dispatch =>{
    axios.post('/api/posts',postData)
        .then(res => dispatch({
            type: ADD_POST,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

//GET POST 
export const getPosts = () => dispatch =>{
    dispatch(setPostLoading())
    axios.get('/api/posts')
        .then(res => dispatch({
            type: GET_POSTS,
            payload: res.data
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Set Loading State
export const setPostLoading = () => {
    return {
        type: POST_LOADING
    }
}

// Delete Post
export const deletePost = (id) => dispatch =>{
    axios.delete(`/api/posts/${id}`)
        .then(res => dispatch({
            type: DELETE_POST,
            payload: id
        }))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Add participate
export const addParticipate = (postId) => dispatch =>{
    axios.post(`/api/posts/participate/${postId}`)
        .then(res => dispatch(getPosts()))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
}

// Remove participate
// export const addLike = (postId) => dispatch =>{
//     axios.post(`/api/posts/unparticipate/${postId}`)
//         .then(res => dispatch(getPosts()))
//         .catch(err => dispatch({
//             type: GET_ERRORS,
//             payload: err.response.data
//         }));
// }
