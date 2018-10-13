

import React from 'react';
import spinner from './spinner.gif';

export const Spinner = () =>(
        <div>
            <img 
            src={spinner} 
            style={{ width: '200px', margin: 'auto', display: 'block'}}
            alt="Loading..." />
        </div>
    )