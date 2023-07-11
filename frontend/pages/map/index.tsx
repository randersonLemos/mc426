import React, { useState, Component } from "react";
import MapDiv from "@components/map";

import { Loader } from "@googlemaps/js-api-loader";


//import GoogleMapReact from "google-map-react";

class App extends Component {
	
	componentDidMount(){
	    const loader = new Loader({
		  apiKey: "AIzaSyCLXtI7gKepIrTL5IvXt4HCJYJxGxDFCBs",
		  version: "weekly",
		});

		loader.load().then(async () => {
		  const { Map } = await google.maps.importLibrary("maps");

		  map = new Map(document.getElementById("map"), {
		    center: { lat: -34.397, lng: 150.644 },
		    zoom: 8,
		  });
		});
	  }
	
	render() {  
	    return (
	      <mapDiv id="map" style={{width : 500 + 'px'}, {heigth: 500 + 'px'}}/>
	    );
	  }
}

export default App
