import React, { useState, useEffect, useCallback, useRef } from 'react';

import GoogleMapReact from 'google-map-react';

import blueDot from '../../../../../assets/images/blue-dot.png';
import personIcon from '../../../../../assets/images/person-icon.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import MarkerSummary from '../FilterList/FilterList';

interface MarkerProps {

    id: number;

    // GenericMarker
    latitude: string;
    longitude: string;
    type: string;
    name: string;
    description?: string;

    // EventMarker
    event_type?: number;
    event_date?: string;

    // ConstructionMarker
    construction_type?: number;

    // StudyGroupMarker
    group_size?: number;
    discipline?: string;
    class_group?: string;

    // ExtraActivityMarker
    activity_type?: number;

}

interface Props {
    center?: {
        lat: number,
        lng: number
    },
    zoom?: number;
    draggable?: boolean;
    satellite?: boolean;
    disableUI?: boolean;
    markers?: MarkerProps[];
}

export default (props: Props) => {

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const [selectedMarkerIcon, setSelectedMarkerIcon] = useState<any>(undefined);

    const [selectedMarkerTitle, setSelectedMarkerTitle] = useState<any>(undefined);

    const [clickedMarker, setClickedMarker] = useState<any>(undefined)

    const prevClickedMarker = usePrevious(clickedMarker)

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

    function usePrevious(value: any) {
        const ref = useRef();
        useEffect(() => {
          ref.current = value;
        });
        return ref.current;
      }

    const returnMyPositionMarker = (map: any) => {
        if (props.center) {
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
                })
            )
        }
    }

    // setTheArray([...theArray, newElement]);

    async function getAllMarkers() {
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
            } catch (err) {
                console.log("Erro em getAllMarkers", err);
            }
        });
    }

    const handleAllMarkers = useCallback(
        (map: any) => {

            let markersMapsFormat: any[] = [];
    
            let markersListeners: any[] = [];
    
            markers.forEach((marker, index) => {
    
                const markersMapsFormat = []
    
                const m = new google.maps.Marker({
                    title: marker.id + "-" + marker.name,
                    position: {
                        lat: parseFloat(marker.latitude),
                        lng: parseFloat(marker.longitude)
                    },
                    // label: marker.name,
                    map: map,//Objeto mapa
                    icon: { url: blueDot }, 
                })
    
                markersMapsFormat.push(m)
    
                google.maps.event.addListener(m, 'click', function () {
    
                    console.log("valor de antes na func: ", clickedMarker)
    
                    setClickedMarker(m);
    
                    m.getAnimation() ? m.setAnimation(null) : m.setAnimation(google.maps.Animation.BOUNCE);
                    setSelectedMarkerIcon(m.getIcon());
                    setSelectedMarkerTitle(m.getTitle());
                });
    
            })
    
            return markersMapsFormat;
        }, [clickedMarker, markers]
    )

    useEffect(()=> {

        if (clickedMarker && prevClickedMarker){
            // @ts-ignore
            prevClickedMarker.setAnimation(null);
        }
        
    }, [clickedMarker])

    useEffect(() => {
        getAllMarkers();
        // setInterval(async () => {
        //     getAllMarkers()
        //     //set state aqui
        //   }, 30000);
    }, [])

    if (markers) {
        return (
            // Important! Always set the container height explicitly
            <>
                <MarkerSummary icon={selectedMarkerIcon} id_title={selectedMarkerTitle}/>
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

                        handleAllMarkers(map)

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
    } else {
        return <CustomCircularProgress />
    }

}
