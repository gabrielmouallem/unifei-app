import React, { useState } from 'react';

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
        <>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAaZsfNRSww_QDtQJXRP-BsrXg83EKqoYw",
                    language: "pt",
                    region: "BR"
                }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                onGoogleApiLoaded={({ map, maps }) =>
                {
                    new google.maps.Marker({
                        position: {
                            lat: -22.413042,
                            lng: -45.449687
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413842,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.449207
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413082,
                            lng: -45.448207
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.414202,
                            lng: -45.449007
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.414202,
                            lng: -45.449907
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413602,
                            lng: -45.449907
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
    
                    })

                    new google.maps.Marker({
                        position: {
                            lat: -22.413602,
                            lng: -45.450907
                        },
                        map: map,//Objeto mapa
                        icon: {url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
    
                    })
                }
                }
            >
            </GoogleMapReact>
        </>
    );
}
