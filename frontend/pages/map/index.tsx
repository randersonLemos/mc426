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
    lat: 0,
    lng: 0
  },
  zoom: 4
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
   return
 }

 render() {
		return (
			
				<script async
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXtI7gKepIrTL5IvXt4HCJYJxGxDFCBs
				&libraries=maps,marker&v=beta">
				</script>
				,<div id="map" ></div>
				
		);
	}
	
}
  
export default App
