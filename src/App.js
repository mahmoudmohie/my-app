import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

import NavSearch from './NavSearch'



class App extends Component {
  
    componentDidMount() {
    
    this.getVenues()
  }
  renderMap = () => {
    loadScript("https://maps.googleapis.com/maps/api/js?key=AIzaSyCPi0o_tjNjKYYDe_6nYg82r0leI7kKlOE&callback=initMap")
    window.initMap = this.initMap
  }


  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "5WF0KD20FEYNIN04JWAT5JQS5N1QA5IGUGTZIRTNN5M5IXZW",
      client_secret: "ZUMGHKBY3T0ID3BNEUJG2GN2BMPBWY2RUT0YV3LBA5YH3IYM",
      query: "food",
      near: "Sydney",
       v:"20180323"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log("ERROR!! " + error)
      })

  }


 initMap = () => {

    // Create A Map
    var map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 6
    })

this.state.venues.map(myVenue =>{
 var marker = new window.google.maps.Marker({
        position: {lat: myVenue.venue.location.lat , lng: myVenue.venue.location.lng},
        map: map,
   
  
  });
})


  }
         render() {
    return (
      <main>
        <div id="map"></div>
   <NavSearch handleQuery={this.handleQuery} />
 
      
      
      </main>
    )
  }
}

function loadScript(url) {
  var index  = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.async = true
  script.defer = true
  index.parentNode.insertBefore(script, index)
}




export default App;