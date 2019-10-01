import React, { Component } from 'react';
import MapContainer from './Components/maps/mapcontainer'
import HumanJuice from './Components/juice/humanJuice'
import logo from './logo.svg';
import './App.css';
import { stat } from 'fs';

const apiEndpointCar = "http://localhost:3000/chargingstations"
const apiEndpointPeople = "http://localhost:3000/stores"

class App extends Component {
  constructor () {
    super ()
    this.state = {
      stations: [],
      humans: [],
      showCarJuice: false,
      showPeopleJuice: false,
    }
  }

  componentDidMount(){
    this.getChargeStations(apiEndpointCar)
    this.getStores(apiEndpointPeople)
  }

  onPeopleButtonClick = () =>
    this.setState({
      showPeopleJuice: true,
      showCarJuice: false
  });

  onCarButtonClick = () =>
    this.setState({
      showCarJuice: true,
      showPeopleJuice: false
  });

  getChargeStations = (apiEndpointCar) => {
    fetch(apiEndpointCar)
      .then(response => response.json())
      .then(result => this.addToStateCar(result))
      .catch(error => console.error(error))
  }

  getStores = (apiEndpointPeople) => {
    fetch(apiEndpointPeople)
      .then(response => response.json())
      .then(result => this.addToStatePeople(result))
      .catch(error => console.error(error))
  }

  addToStateCar = (result) => {
    console.log(result)
    this.setState(state => {
      state.stations = result
      return state
    })
  }
  addToStatePeople = (result) => {
    console.log(result)
    this.setState(state => {
      state.humans = result
      return state
    })
  }

  render () {
    return (
      <div className="mainPage">
        <h1>Juice Me Up!</h1>
        <button onClick={this.onPeopleButtonClick}>
          Click Me For Human Juice
        </button>
        <button onClick={this.onCarButtonClick}>
          Click Me For Car Juice
        </button>
        { this.state.showCarJuice === false
          ? <HumanJuice stations={this.state.humans}></HumanJuice>
          : <MapContainer stations={this.state.stations}/>

        }


      </div>
    )
  }

}

export default App;
