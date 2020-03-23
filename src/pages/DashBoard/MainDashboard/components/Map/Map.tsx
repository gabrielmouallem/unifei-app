import React, { useState } from 'react';
import './Map.scss';

import GoogleMapReact from 'google-map-react';

const AnyReactComponent = () => <div>MARKER</div>;

export default () => {

    const [defaultProps, _] = useState({
        center: {
            lat: -22.413042,
            lng: -45.449687
        },
        zoom: 17
    });

    return (
        // Important! Always set the container height explicitly
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAaZsfNRSww_QDtQJXRP-BsrXg83EKqoYw",
                    language: "pt",
                    region: "BR" 
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent />
            </GoogleMapReact>
        </div>
    );
}
