import React from 'react';
//import '../../styles/weather.css';
//import '../../styles/weather-icons.min.css'

const WeatherBar = props => {
    const icons = [
        "wi-cloudy-gusts",
        "wi-rain-wind",
        "wi-cloudy-gusts",
        "wi-thunderstorm",
        "wi-thunderstorm",
        "wi-rain-mix",
        "wi-rain-mix",
        "wi-snow",
        "wi-sleet",
        "wi-sleet",
        "wi-sleet",
        "wi-showers",
        "wi-showers",
        "wi-snow",
        "wi-snow",
        "wi-snow",
        "wi-snow",
        "wi-hail",
        "wi-sleet",
        "wi-fog",
        "wi-fog",
        "wi-fog",
        "wi-fog",
        "wi-strong-wind",
        "wi-strong-wind",
        "wi-cloudy",
        "wi-cloudy",
        "wi-night-alt-cloudy",
        "wi-day-cloudy",
        "wi-night-clear",
        "wi-day-sunny",
        "wi-night-alt-cloudy",
        "wi-day-cloudy",
        "wi-rain-wind",
        "wi-day-sunny",
        "wi-thunderstorm",
        "wi-thunderstorm",
        "wi-thunderstorm",
        "wi-showers",
        "wi-snow",
        "wi-snow",
        "wi-snow",
        "wi-cloudy",
        "wi-storm-showers",
        "wi-snow",
        "wi-thunderstorm",
        "wi-na"
    ];
    return (
        <div className={props.hide ? "hidden" : "weatherBar"}>
            <div className="conditionsBar">
                <span><i className={icons[props.sky]} /></span><span onClick={props.onClick}>{props.temp}</span>
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