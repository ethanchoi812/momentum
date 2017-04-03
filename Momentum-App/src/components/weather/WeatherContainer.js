import React, { Component } from 'react';
import WeatherBar from './WeatherBar';
import WeatherBarError from './WeatherBarError';




export default class WeatherContainer extends Component {
  constructor(){
    super();
    this.state = {
      temp_c: "",
      temp_f: "",
      useF: false,
      userFromF: false,
      sky: "",
      location: "",
      msg: "",
      settingsLoaded: false
    }
  }
  componentDidMount(){
    this.getPosition().catch(this.handleError)
      .then(this.getWeather).catch(this.handleError)
      .then(this.processResponse).catch(this.handleError)
      .then(this.insertWeatherData).catch(this.handleError)
  }
  //Get user's coords and construct url for weather api call
  getPosition(){
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        function(position){
          let lat = position.coords.latitude,
              lon = position.coords.longitude,
              url = `https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.places%20WHERE%20text%3D%22(${lat}%2C${lon})%22)&format=json&diagnostics=true&callback=`
          resolve(url);
        },
        function(){
          reject("Geolocation service unavailable")
        }
      )
    });
  }
  //Call the weather API
  getWeather(url){
    return fetch(url)
            .then(function(response){
              return response;
            },
            function(){
              return Promise.reject("Weather service unavailable")
            });
  }
  //Transform the response into json
  processResponse(response){
    if(response && response.ok){
      return response.json();
    }else {
      return Promise.reject("Invalid response from a weather service")
    }
  }
  //Process all the data and update the state
  insertWeatherData = (data)=>{
    const countriesUsingF = ["United States of America", "Cayman Islands", "Bahamas", "Belize"],
          country = data.query.results.channel.location.country,
          component = this;
   
   window.chrome.storage.sync.get("weatherUseF", function(settings){
      component.setState({
        temp_f: data.query.results.channel.item.condition.temp + " ⁰F",
        temp_c: ((Number(data.query.results.channel.item.condition.temp) - 32) / 1.8).toFixed(0) + " ⁰C",
        location: `${data.query.results.channel.location.city}, ${country}`,
        sky: data.query.results.channel.item.condition.code,
        userFromF: countriesUsingF.includes(country),
        useF: settings.weatherUseF === undefined ? countriesUsingF.includes(country) : settings.weatherUseF
      });
    }); 
  }
  handleError = (msg) =>{
    this.setState({
      msg: msg
    })
    return Promise.reject(msg);
  }
  //Function for switching between F and C
  handleClickUnits = () => {
    window.chrome.storage.sync.set({"weatherUseF": !this.state.useF})
    this.setState({useF: !this.state.useF})
  }

  render() {
    if(this.state.msg){
      return (<WeatherBarError msg={this.state.msg} hide={this.props.hide} />);
    }else {
    return (
      <WeatherBar temp={this.state.useF ? this.state.temp_f : this.state.temp_c} 
                  sky={this.state.sky} 
                  location={this.state.location} 
                  onClick={this.handleClickUnits} 
                  hide={this.props.hide} />
    );
    }
  }
}
