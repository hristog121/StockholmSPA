import React from "react";
import ReactDOM from "react-dom";
import TulipForm from "./TulipForm";
import ReactDOMServer from "react-dom/server";
import { connect } from "react-redux";
import { startAddPlace } from "../actions/places";
import selectPlaces from "../selectors/places";
import InfoWindow from "./InfoWindow";
//Render map on the page
const initMap = (props, mapNode) => {
  //Google is available
  const { google } = props;
  const maps = google.maps;

  //ref to the actual DOM not the virtual DOM
  const node = ReactDOM.findDOMNode(mapNode);

  const initialCenter = props.initialCenter;
  const zoom = props.zoom;
  const { lat, lng } = initialCenter;
  const center = new maps.LatLng(lat, lng);
  const mapConfig = Object.assign(
    {},
    {
      center: center,
      zoom: zoom
    }
  );
  //instantiate a map with two config options as arguments
  return new maps.Map(node, mapConfig);
};

class MapSet extends React.Component {
  //Set default state
  state = {
    addLocationInfoWindow: undefined,
    activeMarkerInfoWindow: undefined,
    markers: []
  };

  //componentDidUpdate will make sure that the component updated and will change the map
  componentDidUpdate(prevProps, prevState, snapshot) {
    //Check if google api is available
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    //Check if there is new added places
    if (prevProps.places !== this.props.places) {
      this.renderMarkersOnMap();
      this.closeOpenedInfoWindow();
    }
    //Check for new active place
    if (prevProps.activePlace !== this.props.activePlace) {
      let zoomPlace = this.props.activePlace.place;
      this.zoomPlace(zoomPlace);
      this.showInfoWindowPlace(this.props.activePlace.place);
    }
  }

  componentDidMount() {
    this.loadMap();
  }

  loadMap() {
    // First check if google api is available
    if (this.props && this.props.google) {
      this.map = initMap(this.props, this.refs.map);
      this.renderMarkersOnMap();
      this.onMapClicked();
    }
  }

  //Function to render the added markers on the map with the default image
  renderMarkersOnMap = () => {
    this.clearMarkers();
    let markers = [];

    const customMarker = 'http://thaitravel.codeitfactory.com/wp-content/uploads/2019/01/sweden_flag-e1548877623661.png';
    this.props.places.map(place => {
      const marker = new google.maps.Marker({
        position: place.position,
        map: this.map,
        animation: google.maps.Animation.DROP,
        icon: customMarker,
        title: place.title
      });

      markers.push(marker);

      const markerInfowindow = this.createMarkerInfoWindow(place.title);

      marker.addListener("click", () => {
        this.closeOpenedInfoWindow();
        this.setState({
          activeMarkerInfoWindow: markerInfowindow
        });
        markerInfowindow.open(this.map, marker);
      });
    });
    this.setState({ markers });
  };

  onMapClicked = () => {
    this.map.addListener("click", e => {
      this.closeOpenedInfoWindow();
      //Constant for the form
      const tulip = <TulipForm />;
      const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      this.showTulipOnMap(position, tulip);

      google.maps.event.addListener(
        this.state.addLocationInfoWindow,
        "domready",
        () => {
          document.getElementById("tulip").addEventListener("submit", e => {
            e.preventDefault();
            this.props.startAddPlace({
              position,
              title: e.target.elements.title.value
            });
            this.closeOpenedInfoWindow();
            this.renderMarkersOnMap();
          });
        }
      );
    });
  };

  //Remove markers from the map
  clearMarkers = () => {
    if (this.state.markers) {
      this.state.markers.map(marker => {
        marker.setMap(null);
      });
    }
    this.setState({ markers: [] });
  };

  closeOpenedInfoWindow = () => {
    if (this.state.activeMarkerInfoWindow) {
      this.state.activeMarkerInfoWindow.close();
    }
    if (this.state.addLocationInfoWindow) {
      this.state.addLocationInfoWindow.close();
    }
  };

  showTulipOnMap = (position, tulip) => {
    const content = ReactDOMServer.renderToString(tulip);
    this.setState({
      addLocationInfoWindow: new google.maps.InfoWindow({
        content,
        position
      })
    });
    this.state.addLocationInfoWindow.open(this.map);
  };
  //Zoom on the place selected form the list with places
  zoomPlace = places => {
    this.map.setCenter(places.position);
    this.map.setZoom(13);
  };

  showInfoWindowPlace = place => {
    const matchedMarkers = this.state.markers.filter(marker => {
      return (
        marker.position.lat() === place.position.lat &&
        marker.position.lng() === place.position.lng &&
        marker.title === place.title
      );
    });
    const activeMarker = matchedMarkers[0];
    if (activeMarker) {
      this.closeOpenedInfoWindow();
      const markerInfowindow = this.createMarkerInfoWindow(activeMarker.title);
      this.setState({ activeMarkerInfoWindow: markerInfowindow });
      markerInfowindow.open(this.map, activeMarker);
    }
  };

  createMarkerInfoWindow = title => {
    const content = ReactDOMServer.renderToString(
      <InfoWindow title={title} />
    );
    return new google.maps.InfoWindow({
      content
    });
  };

  render() {
    const style = {
      width: "78vw",
      height: "93vh"
    };
    return (
      <div ref="map" style={style}>
        Loading map...
      </div>
    );
  }
}

MapSet.defaultProps = {
  zoom: 11,
  //Set Stockholm as a initial center
  initialCenter: {
    lat: 59.3293,
    lng: 18.0686
  }
};

const mapStateToProps = state => {
  return {
    places: selectPlaces(state.places, state.filters),
    activePlace: state.activePlace
  };
};

const mapDispatchToProps = dispatch => ({
  startAddPlace: place => dispatch(startAddPlace(place))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapSet);
