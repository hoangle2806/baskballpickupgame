const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data){
    let errors = {};

    data.handle = !isEmpty(data.handle) ? data.handle : "";
    data.experience = !isEmpty(data.experience) ? data.experience : "";

    if(!Validator.isLength(data.handle, {min: 2, max: 40})){
        errors.handle = "Handle needs to be between 2 and 4 characters";
    }

    if (Validator.isEmpty(data.handle)){
        errors.handle = "Profile handle is required";
    }

    if (Validator.isEmpty(data.experience)){
        errors.experience = "Experience is required";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}