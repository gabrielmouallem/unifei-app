import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';

import blueDot from '../../../../../assets/images/blue-dot.png';
import redDot from '../../../../../assets/images/red-dot.png';
import greenDot from '../../../../../assets/images/green-dot.png';

const AnyReactComponent = () => <div>MARKER</div>;

export default () => {

    const [defaultProps, _] = useState({
        center: {
            lat: -22.413042,
            lng: -45.449687
        },
        zoom: 17
    });

    const defaultMapOptions = {
        fullscreenControl: false,
    };

    return (
        // Important! Always set the container height explicitly
        <>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAaZsfNRSww_QDtQJXRP-BsrXg83EKqoYw",
                    language: "pt",
                    region: "BR"
                }}
                options={defaultMapOptions}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) => {
                    new google.maps.Marker({
                        position: {
                            lat: -22.413042,
                            lng: -45.449687
                        },
                        map: map,//Objeto mapa
                        icon: { url: blueDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: { url: blueDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413842,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: { url: blueDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.449207
                        },
                        map: map,//Objeto mapa
                        icon: { url: redDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.448207
                        },
                        map: map,//Objeto mapa
                        icon: { url: redDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.414202,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: { url: redDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.414202,
                            lng: -45.449907
                        },
                        map: map,//Objeto mapa
                        icon: { url: greenDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413602,
                            lng: -45.449907
                        },
                        map: map,//Objeto mapa
                        icon: { url: greenDot }

                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413602,
                            lng: -45.450907
                        },
                        map: map,//Objeto mapa
                        icon: { url: greenDot }

                    })
                }
                }
            >
            </GoogleMapReact>
        </>
    );
}
