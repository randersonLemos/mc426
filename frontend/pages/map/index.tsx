import React, { useState, Component } from "react";

import { Loader } from "@googlemaps/js-api-loader";
import styles from "@/styles/Home.module.css";

class App extends Component {
	render() {  
		return (
			<span>
				<script async
				src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLXtI7gKepIrTL5IvXt4HCJYJxGxDFCBs
				&libraries=maps,marker&v=beta">
				</script>
				<Gmp-map id="map" center="-22.9005447311, -47.0543764492"  zoom="10" map-id="map_id"></Gmp-map>
			</span>		
		);
	}
}
export default App
