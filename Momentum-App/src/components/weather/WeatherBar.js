import React from 'react';
//import '../../styles/weather.css';
//import '../../styles/weather-icons.min.css'

const WeatherBar = props => {
    const icons = [
        "wi wi-cloudy-gusts",
        "wi wi-rain-wind",
        "wi wi-cloudy-gusts",
        "wi wi-thunderstorm",
        "wi wi-thunderstorm",
        "wi wi-rain-mix",
        "wi wi-rain-mix",
        "wi wi-snow",
        "wi wi-sleet",
        "wi wi-sleet",
        "wi wi-sleet",
        "wi wi-showers",
        "wi wi-showers",
        "wi wi-snow",
        "wi wi-snow",
        "wi wi-snow",
        "wi wi-snow",
        "wi wi-hail",
        "wi wi-sleet",
        "wi wi-fog",
        "wi wi-fog",
        "wi wi-fog",
        "wi wi-fog",
        "wi wi-strong-wind",
        "wi wi-strong-wind",
        "wi wi-cloudy",
        "wi wi-cloudy",
        "wi wi-night-alt-cloudy",
        "wi wi-day-cloudy",
        "wi wi-night-clear",
        "wi wi-day-sunny",
        "wi wi-night-alt-cloudy",
        "wi wi-day-cloudy",
        "wi wi-rain-wind",
        "wi wi-day-sunny",
        "wi wi-thunderstorm",
        "wi wi-thunderstorm",
        "wi wi-thunderstorm",
        "wi wi-showers",
        "wi wi-snow",
        "wi wi-snow",
        "wi wi-snow",
        "wi wi-cloudy",
        "wi wi-storm-showers",
        "wi wi-snow",
        "wi wi-thunderstorm",
        "wi wi-na"
    ];
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