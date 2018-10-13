

import React from 'react';

const ProfileDisplay = (props) => (
    //Need a pretty way to display these data
    <div>
        <table style={{padding: 15}}>
        <tbody>
            <tr>
                <th>Handle</th>
                <th>Location</th>
                <th>Experience</th>
            </tr>
            <tr>
                <td>{props.userdata.handle}</td>
                <td>{props.userdata.location}</td>
                <td>{props.userdata.experience}</td>
            </tr>
        </tbody>
        </table>
    </div>
)

export default ProfileDisplay;