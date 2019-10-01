import React, { Component } from 'react';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: props,
      showingInfoWindow: true
    })
  }

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  plotMarker = () => (this.props.stations.map(station => (
    <Marker onClick={this.onMarkerClick} position={{lat: station.lat, lng: station.long}} name={`Address: ${station.address}, 
    Comment: ${station.comment}`} icon={{url:"https://img.icons8.com/color/48/000000/air-recirculation--v2.png"}} />)) 
  )

  render() {
    if (!this.props.loaded) return <div>Loading...</div>;


    return (
      <Map
        className="map"
        google={this.props.google}
        onClick={this.onMapClicked}
        style={{ height: '80%', position: 'center', width: '99%' }}
        zoom={13}>
          {this.plotMarker()}
        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}>
          <div>
            <h4>Info: {this.state.selectedPlace.name}</h4>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyCJwIQJhwFabrSJmjbJdsXoJtRh92-TW0E")
})(MapContainer)
