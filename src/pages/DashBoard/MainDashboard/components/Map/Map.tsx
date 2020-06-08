import React, { useState } from 'react';

import GoogleMapReact from 'google-map-react';

import blueDot from '../../../../../assets/images/blue-dot.png';
import personIcon from '../../../../../assets/images/person-icon.png';
import greenDot from '../../../../../assets/images/green-dot.png';

interface Props {
    center?: {
        lat: number,
        lng: number
    },
    zoom?: number;
    draggable?: boolean;
    satellite?: boolean;
    disableUI?: boolean;
}

export default (props: Props) => {

    const [defaultProps, _] = useState({
        center: {
            lat: -22.413042,
            lng: -45.449687
        },
        zoom: 17
    });

    const defaultMapOptions = {
        fullscreenControl: false,
        mapTypeId: props.satellite ? "satellite" : "roadmap",
        disableDefaultUI: props.disableUI ? true : false
    };

    const returnMyPositionMarker = (map: any) => {
        if(props.center){
            return (
                new google.maps.Marker({
                position: {
                    // @ts-ignore
                    lat: props.center.lat,
                    // @ts-ignore
                    lng: props.center.lng
                },
                map: map,//Objeto mapa
                icon: { url: personIcon }
            }))
        }
    }    

    return (
        // Important! Always set the container height explicitly
        <>
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: "AIzaSyAaZsfNRSww_QDtQJXRP-BsrXg83EKqoYw",
                    language: "pt",
                    region: "BR"
                }}
                key={`${props.center}`}
                options={defaultMapOptions}
                defaultCenter={props.center ? props.center : defaultProps.center}
                defaultZoom={props.zoom ? props.zoom : defaultProps.zoom}
                draggable={props.draggable !== undefined ? props.draggable : true}

                onGoogleApiLoaded={({ map, maps }) => {

                    returnMyPositionMarker(map)

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413082,
                    //         lng: -45.449007
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: blueDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413842,
                    //         lng: -45.449007
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: blueDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413082,
                    //         lng: -45.449207
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: redDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413082,
                    //         lng: -45.448207
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: redDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.414202,
                    //         lng: -45.449007
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: redDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.414202,
                    //         lng: -45.449907
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: greenDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413602,
                    //         lng: -45.449907
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: greenDot }

                    // })

                    // new google.maps.Marker({
                    //     position: {
                    //         lat: -22.413602,
                    //         lng: -45.450907
                    //     },
                    //     map: map,//Objeto mapa
                    //     icon: { url: greenDot }

                    // })
                }
                }
            >

            </GoogleMapReact>
        </>
    );
}
