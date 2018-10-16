
import React from 'react';
import PropTypes from 'prop-types';


const DisplayProfile = (props) => (
    <div className="box">
        <img src={props.userImage.avatar} alt="" className="box-img" />
        <h1>{props.userdata.handle}</h1>
        <small> Experience: {props.userdata.experience}</small>
        <p>About me </p>
    </div>
)

export default DisplayProfile;