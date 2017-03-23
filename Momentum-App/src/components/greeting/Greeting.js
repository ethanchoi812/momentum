import React from 'react';
//import '../../styles/greeting.css'

const Greeting = props => {
    let time = parseInt(new Date().toLocaleTimeString(undefined, {hour12: false}), 10);
    let greeting;
    if (time < 4) {
        greeting = `Not in your bed yet, ${props.username}?`
    }else if (time < 12) {
        greeting = `Good morning, ${props.username}. Have a great day!`
    }else if (time < 19){
        greeting = `Good afternoon, ${props.username}. How is your day?`
    }else if (time < 22) {
        greeting = `Good evening, ${props.username}.`
    }else if (time <= 24){
        greeting = `Staying late, ${props.username}?`
    }
    return (
        <div className="greetingBox" onDoubleClick={props.onDoubleClick} >
         {greeting}
        </div>
    );
};


export default Greeting;