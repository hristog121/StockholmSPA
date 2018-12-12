import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {
    static defaultProps = {
        center: {
            lat: 59.3293,
            lng: 18.0686
        },
        zoom: 11
    };

    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '100vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: 'AIzaSyByaj5hVrMh9Ye431f9XFgMrC4DPGMNLhk' }}
                    defaultCenter={this.props.center}
                    defaultZoom={11}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap;
