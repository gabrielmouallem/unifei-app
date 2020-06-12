import React, { useState, useEffect, useCallback, useRef } from 'react';

import GoogleMapReact from 'google-map-react';

import blueDot from '../../../../../assets/images/blue-dot.png';
import personIcon from '../../../../../assets/images/person-icon.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import MarkerSummary from '../FilterList/FilterList';
import { MARKER_ICON_TYPES } from '../../../../../utils/consts';
import { Fade } from '@material-ui/core';
import { FilterState } from '../../../../../redux/filter/types';
import { useSelector } from 'react-redux';
import { ApplicationState } from '../../../../../redux';

interface MarkerProps {

    id: number;

    // GenericMarker
    latitude: string;
    longitude: string;
    type: number;
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

    var filter: FilterState = useSelector((state: ApplicationState) => state.filter);

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

    const handleTypeIcon = (markerType: any) => {
        return MARKER_ICON_TYPES[markerType]
    }

    const handleAllMarkers = useCallback(
        (map: any) => {

            let markersMapsFormat: any[] = [];
    
            markers.forEach((marker, index) => {
    
                if (filter.data.type === marker.type || filter.data.type === undefined){
                    const markersMapsFormat = []
    
                    const m = new google.maps.Marker({
                        title: marker.id + "-" + marker.name,
                        position: {
                            lat: parseFloat(marker.latitude),
                            lng: parseFloat(marker.longitude)
                        },
                        // label: marker.name,
                        map: map,//Objeto mapa
                        icon: { url:handleTypeIcon(marker.type) }, 
                    })
        
                    markersMapsFormat.push(m)
        
                    google.maps.event.addListener(m, 'click', function () {
        
                        console.log("valor de antes na func: ", clickedMarker)
        
                        setClickedMarker(m);
        
                        m.getAnimation() ? m.setAnimation(null) : m.setAnimation(google.maps.Animation.BOUNCE);
                        setSelectedMarkerIcon(m.getIcon());
                        setSelectedMarkerTitle(m.getTitle());
                    });
                }
            })
    
            return markersMapsFormat;
        }, [clickedMarker, markers, filter]
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
                    // Gambiarra que atualiza mapa sempre que sair e entrar novamente no mapa
                    // Assim os markers nao somem misteriosamente
                    key={`${markers.length}`}
                    options={defaultMapOptions}
                    defaultCenter={props.center ? props.center : defaultProps.center}
                    defaultZoom={props.zoom ? props.zoom : defaultProps.zoom}
                    draggable={props.draggable !== undefined ? props.draggable : true}

                    onGoogleApiLoaded={({ map, maps }) => {

                        returnMyPositionMarker(map)
                        handleAllMarkers(map)
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
