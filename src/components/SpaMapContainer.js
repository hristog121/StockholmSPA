import React from "react";
import { GoogleApiWrapper } from "google-maps-react";
import Map from "./MapSet";
import LoadingPage from "./LoadingPage";

export class MapContainer extends React.Component {
  render() {
    // If the props are not loaded correctly -> show loading page
    if (!this.props.loaded) {
      return <LoadingPage />;
    }
    return (
      <div>
        <Map google={this.props.google} />
      </div>
    );
  }
}

export default GoogleApiWrapper({
  //Add your key
  apiKey: "AIzaSyAFCs9uvB4Ld826g5qunfgnICVzhupvYNw"
})(MapContainer);
