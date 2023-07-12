import React, { useState, Component } from "react";

import styles from "@/styles/Home.module.css";
import { Loader } from "@googlemaps/js-api-loader"


const loader = new Loader({
  apiKey: "AIzaSyCLXtI7gKepIrTL5IvXt4HCJYJxGxDFCBs",
  version: "weekly",
  libraries: ["places"]
});

const mapOptions = {
  center: {
    lat: -22.901, 
    lng: -47.054
  },
  zoom: 8
};

class App extends Component {
  componentDidMount() {
    loader
    .importLibrary('maps')
    .then(({Map}) => {
      new Map(document.getElementById("map"), mapOptions);
    })
    .catch((e) => {
      // do something
    });
    loader
    .load()
    .then((google) => {
      new google.maps.Map(document.getElementById("map"), mapOptions);
    })
    .catch(e => {
      // do something
    });   
  }

  render() {
    return (
      <div id="map" style={{height : 100 + '%'}}></div>
    );
  }
}
export default App
