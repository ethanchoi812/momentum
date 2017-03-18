import React from 'react';
//import '../../styles/weather.css';
//import '../../styles/weather-icons.min.css'

const WeatherBar = props => {
    const icons = {
                "Sunny": 'wi wi-day-sunny',
                "Clear": 'wi wi-night-clear',
                "Partly cloudy": 'wi wi-cloud',
                "Cloudy": 'wi wi-cloudy',
                "Overcast": 'wi wi-cloudy',
                "Mist": 'wi wi-sprinkle',
                "Patchy rain nearby": 'wi wi-sprinkle',
                "Patchy snow nearby": 'wi wi-snow',
                "Patchy sleet nearby": 'wi wi-sleet',
                "Patchy freezing drizzle nearby": 'wi wi-rain-mix',
                "Thundery outbreaks in nearby": 'wi wi-thuderstorm',
                "Blowing snow": 'wi wi-snow-wind',
                "Blizzard": 'wi wi-snow-wind',
                "Fog": 'wi wi-fog',
                "Freezing fog": 'wi wi-fog',
                "Patchy light drizzle": 'wi wi-rain-mix',
                "Light drizzle": 'wi wi-rain-mix',
                "Freezing drizzle": 'wi wi-rain-mix',
                "Heavy freezing drizzle": 'wi wi-rain-mix',
                "Patchy light rain": 'wi wi-rain-mix',
                "Light rain": 'wi wi-sprinkle',
                "Moderate rain at times": 'wi wi-rain',
                "Moderate rain": 'wi wi-rain',
                "Heavy rain at times": 'wi wi-rain',
                "Heavy rain": 'wi wi-rain',
                "Light freezing rain": 'wi wi-sleet',
                "Moderate or heavy freezing rain": 'wi wi-sleet',
                "Light sleet": 'wi wi-sleet',
                "Moderate or heavy sleet": 'wi wi-sleet',
                "Patchy light snow": 'wi wi-snow',
                "Light snow": 'wi wi-snow',
                "Patchy moderate snow": 'wi wi-snow',
                "Moderate snow": 'wi wi-snow',
                "Patchy heavy snow": 'wi wi-snow',
                "Heavy snow": 'wi wi-snow',
                "Ice pellets": 'wi wi-hail',
                "Light rain shower": 'wi wi-showers',
                "Moderate or heavy rain shower": 'wi wi-showers',
                "Torrential rain shower": 'wi wi-showers',
                "Light sleet showers": 'wi wi-sleet',
                "Moderate or heavy sleet showers": 'wi wi-sleet',
                "Light snow showers": 'wi wi-snow',
                "Moderate or heavy snow showers": 'wi wi-snow',
                "Light showers of ice pellets": 'wi wi-hail',
                "Moderate or heavy showers of ice pellets": 'wi wi-hail',
                "Patchy light rain in area with thunder": 'wi wi-storm-showers',
                "Moderate or heavy rain in area with thunder": 'wi wi-storm-showers',
                "Patchy light snow in area with thunder": 'wi wi-storm-showers',
                "Moderate or heavy snow in area with thunder": 'wi wi-storm-showers',
                "default": 'wi wi-na'
            };
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