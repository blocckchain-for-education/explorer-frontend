import React from "react";
import nictImage from '../../assets/nodes/nict.png'

const { compose, withProps, withHandlers } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} = require("react-google-maps");
const {
  MarkerClusterer
} = require("react-google-maps/lib/components/addons/MarkerClusterer");
const MapWithAMarkerClusterer = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBDAmPZNIM3fYEWDqX1jKXT8pl-cg9Z9BI&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withHandlers({
    onMarkerClustererClick: () => markerClusterer => {
      const clickedMarkers = markerClusterer.getMarkers();
      console.log(`Current clicked markers length: ${clickedMarkers.length}`);
      console.log(clickedMarkers);
    }
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={3} defaultCenter={{ lat: 25.0391667, lng: 121.525 }}>
    <MarkerClusterer
      onClick={props.onMarkerClustererClick}
      averageCenter
      enableRetinaIcons
      gridSize={60}
      defaultImageSize={1}
      styles={[		
        {		
          url: "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m1.png",		
          height: 53,		
          width: 53
       }]
      }
      
    >
      {props.markers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          icon={{
            url: nictImage
          }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

class NodesMap extends React.PureComponent {
  componentWillMount() {
    this.setState({ markers: [] });
  }

  componentDidMount() {
   let data = [
      {
        longitude: 105.844258,
        latitude: 21.004467,
        id: Math.random(0, 1999)
      },
      
      {
        longitude: 105.844258,
        latitude:21.004467,
        id: Math.random(0, 1999)
      },
      {
        longitude: 105.844258,
        latitude: 21.004467,
        id: Math.random(0, 1999)
      },
      {
        longitude:105.844258,
        latitude: 21.004467,
        id: Math.random(0, 1999)
      },
      {
        longitude: 139.488019,
        latitude: 35.708170,
        id: Math.random(0, 1999)
      },
      {
        longitude: 139.488019,
        latitude: 35.708170,
        id: Math.random(0, 1999)
      },
      {
        longitude: 139.488019,
        latitude: 35.708170,
        id: Math.random(0, 1999)
      },
      {
        longitude: 139.488019,
        latitude: 35.708170,
        id: Math.random(0, 1999)
      },
      {
        longitude: 101.715954,
        latitude: 2.993071,
        id: Math.random(0, 1999)
      },
      {
        longitude: 101.715954,
        latitude: 2.993071,
        id: Math.random(0, 1999)
      },
      {
        longitude: 101.715954,
        latitude: 2.993071,
        id: Math.random(0, 1999)
      },
    ];

    this.setState({ markers: data });
  }

  render() {
    return <MapWithAMarkerClusterer markers={this.state.markers} />;
  }
}

export default NodesMap;
