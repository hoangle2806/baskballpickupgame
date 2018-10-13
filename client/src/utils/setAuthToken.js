

// set default header for axios, fetch required a lot of typing
import axios from 'axios';

const setAuthToken = token => {
    if (token){
        // Apply to every request
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

export default setAuthToken;