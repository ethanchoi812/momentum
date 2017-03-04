import React, { Component } from 'react';
import WeatherBar from './WeatherBar';
import WeatherBarError from './WeatherBarError';




export default class WeatherContainer extends Component {
  constructor(){
    super();
    this.state = {
      temp_c: "",
      temp_f: "",
      temp_used: "",
      sky: "",
      location: "",
      msg: ""
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
          let coords = position.coords.latitude.toFixed(2) + "," + position.coords.longitude.toFixed(2);
          const key =/* "e984c7d121044a32a18221132170402"*/"lalala";
          let url = "https://api.apixu.com/v1/current.json?key=" + key + "&q=" + coords;
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
    let countriesUsingF = ["United States of America", "Cayman Islands", "Bahamas", "Belize"];
    let country = data.location.country;
    this.setState({
      temp_c: data.current.temp_c.toFixed(0) + "*C",
      temp_f: data.current.temp_f.toFixed(0) + "*F",
      sky: data.current.condition.text,
      location: data.location.name + ", " + data.location.country
      }, ()=>{this.setState((prevState) =>{
        let properTemp = countriesUsingF.includes(country) ? {temp_used: prevState.temp_f} : {temp_used: prevState.temp_c};
        return properTemp;
      });
    }
    );
  }
  handleError = (msg)=>{
    this.setState({
      msg: msg
    })
    return Promise.reject(msg);
  }
  //Function for switching between F and C
  handleClickUnits = ()=> {
    if(this.state.temp_used === this.state.temp_c){
      this.setState({temp_used: this.state.temp_f})
    }else {
      this.setState({temp_used: this.state.temp_c})
    }
  }
  render() {
    if(this.state.msg){
      return (<WeatherBarError msg={this.state.msg} />);
    }else {
    return (
      <WeatherBar temp={this.state.temp_used} sky={this.state.sky} location={this.state.location} onClick={this.handleClickUnits} />
    );
    }
  }
}
