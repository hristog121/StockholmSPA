import {GoogleApiWrapper, Map, InfoWindow, Marker} from 'google-maps-react';
import React from "react";

export class MapContainer extends React.Component {
    render() {
        return (
            <Map google={this.props.google} zoom={11}>

            </Map>
        );
    }
}


export default GoogleApiWrapper(
    (props) => ({
        apiKey: "AIzaSyByaj5hVrMh9Ye431f9XFgMrC4DPGMNLhk",
        language: props.language
    }))(MapContainer)
