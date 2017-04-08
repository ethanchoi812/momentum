import React from 'react';
//import '../../styles/weather.css';
//import '../../styles/weather-icons.min.css'

const WeatherBar = props => {
    //Weather API passes general condition as a code (stringified number), which is later used to pick a proper class from this array
    const icons = [
        "wi wi-strong-wind",        //0
        "wi wi-rain-wind",          //1
        "wi wi-strong-wind",        //2
        "wi wi-thunderstorm",       //3
        "wi wi-thunderstorm",       //4
        "wi wi-rain-mix",           //5
        "wi wi-rain-mix",           //6 
        "wi wi-snow",               //7
        "wi wi-sleet",              //8
        "wi wi-sleet",              //9
        "wi wi-sleet",              //10
        "wi wi-showers",            //11
        "wi wi-showers",            //12
        "wi wi-snow",               //13
        "wi wi-snow",               //14
        "wi wi-snow",               //15
        "wi wi-snow",               //16
        "wi wi-hail",               //17
        "wi wi-sleet",              //18
        "wi wi-fog",                //19
        "wi wi-fog",                //20
        "wi wi-fog",                //21
        "wi wi-fog",                //22
        "wi wi-strong-wind",        //23
        "wi wi-strong-wind",        //24
        "wi wi-cloudy",             //25
        "wi wi-cloudy",             //26
        "wi wi-night-alt-cloudy",   //27
        "wi wi-day-cloudy",         //28
        "wi wi-night-alt-cloudy",   //29
        "wi wi-day-cloudy-high",    //30
        "wi wi-night-clear",        //31
        "wi wi-day-sunny",          //32
        "wi wi-night-clear",        //33
        "wi wi-day-sunny",          //34
        "wi wi-thunderstorm",       //35
        "wi wi-thermometer",        //36
        "wi wi-thunderstorm",       //37
        "wi wi-showers",            //38
        "wi wi-thunderstorm",       //39
        "wi wi-showers",            //40
        "wi wi-snow",               //41
        "wi wi-snow",               //42
        "wi wi-snow",               //43
        "wi wi-cloud",              //44
        "wi wi-thunderstorm",       //45
        "wi wi-snow",               //46
        "wi wi-storm-showers"       //47
    ];
    console.log(props.sky);
    return (
        <div className={props.hide ? "hidden" : "weatherBar"}>
            <div className="conditionsBar">
                <div class><i className={icons[props.sky]} /></div><div className="tempBox" onClick={props.onClick}>{props.temp}</div>
            </div>
            <div className="locationBar">
                <span>{props.location}</span>
            </div>
        </div>
    );
};

WeatherBar.propTypes = {
    temp: React.PropTypes.string.isRequired,
    location: React.PropTypes.string.isRequired,
    sky: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default WeatherBar;