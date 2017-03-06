import React from 'react';
import '../../styles/greeting.css'

const Greeting = props => {
    return (
        <div className="greetingBox">
            Hello {props.username}
        </div>
    );
};


export default Greeting;