import React, { useState, Component } from "react";
import MapDiv from "@components/map";

import { Loader } from "@googlemaps/js-api-loader";
import styles from "@/styles/Home.module.css";


//import GoogleMapReact from "google-map-react";

class App extends Component {
	

	
	render() {  
	    return (
		

		  <span>
		    <script async
		    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXtI7gKepIrTL5IvXt4HCJYJxGxDFCBs
		    &libraries=maps,marker&v=beta">
		    </script>
		    <gmp-map center="-22.9005447311, -47.0543764492"  zoom="10" map-id="map_id"></gmp-map>
		  </span	>
		

	    );
	  }
	  //<mapDiv id="map" style={{width : 500 + 'px'}, {heigth: 500 + 'px'}}/>
	  //	<div className={styles.campaignContainer} style={{height : 100 + '%'}, {width : 100 + '%'}}>
	  //<gmp-map center="37.4220656,-122.0840897" -22.9005447311 -47.0543764492 zoom="10" map-id="map_id"></gmp-map>
}

export default App
