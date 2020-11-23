import React, { useState, useEffect, useCallback, useRef } from 'react';

import GoogleMapReact from 'google-map-react';
import blueDot from '../../../../../assets/images/blue-dot.png';
import personIcon from '../../../../../assets/images/person-icon.png';
import classIcon from '../../../../../assets/images/class-marker.png';
import greenDot from '../../../../../assets/images/green-dot.png';
import { coreHTTPClient } from '../../../../../services/webclient';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import MarkerSummary from '../FilterList/SelectedMarkerSummary';
import { MARKER_ICON_TYPES } from '../../../../../utils/consts';
import { MarkerProps } from '../../../../../models/markers';
import { handleFilter, uuidv4 } from '../../../../../utils/utils';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { filterAtom, FilterState } from '../../../../../recoils/filterRecoil';
import { mapPropsAtom, MapPropsState } from '../../../../../recoils/mapPropsRecoil';
import ReloadFab from '../ReloadFab/ReloadFab';
import socketIo from 'socket.io-client';
import { socketURL } from '../../../../../env';
import { reloadAtom, ReloadState } from '../../../../../recoils/reloadRecoil';
import { markersAtom } from '../../../../../recoils/markersRecoil';
import moment from 'moment';
import { AxiosResponse } from 'axios';

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


    const [didMount, setDidMount] = useState(false);

    const [markers, setMarkers] = useState<MarkerProps[]>([]);

    const [selectedMarkerIcon, setSelectedMarkerIcon] = useState<any>(undefined);

    const [selectedMarkerTitle, setSelectedMarkerTitle] = useState<any>(undefined);

    const [clickedMarker, setClickedMarker] = useState<any>(undefined);

    const prevClickedMarker = usePrevious(clickedMarker);

    var [reload, setReload] = useRecoilState(reloadAtom);

    const [googleMap, setGoogleMap] = useState<any>(undefined);

    const filter: FilterState = useRecoilValue(filterAtom);

    const [mapProps, setMapProps] = useRecoilState<MapPropsState>(mapPropsAtom);

    const [loading, setLoading] = useState(false);

    const setMarkersRecoil = useSetRecoilState(markersAtom);

    const [intervalID, setIntervalID] = useState<any>(undefined);

    const [classrooms, setClassrooms] = useState<any[]>([]);

    const [scheduleMarker, setScheduleMarker] = useState<any>(undefined);

    const [classMarker, setClassMarker] = useState<any>(undefined);

    var reload: ReloadState = useRecoilValue(reloadAtom);

    const [defaultProps, _] = useState({
        center: {
            lat: -22.413042,
            lng: -45.449687
        },
        zoom: 18
    });

    const defaultMapOptions = {
        fullscreenControl: false,
        zoomControl: false,
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


    async function reloadAllMarkers() {
        setMarkers([]);
        setReload((prevReloadState) => {
            return { ...prevReloadState, stateChange: uuidv4() }
        })
        setLoading(true);
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                // console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
                setMarkersRecoil(response.data.data.filter((marker: any) => marker.type === 3));
            } catch (err) {
                console.log("Erro em reloadAllMarkers", err);
            } finally {
                setLoading(false);
            }
        });
    }

    async function getAllMarkers() {
        setScheduleMarker(undefined);
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`markers/`);
                // console.log(response)
                // @ts-ignore
                setMarkers(response.data.data);
                console.log(response.data.data);
                setMarkersRecoil(response.data.data.filter((marker: any) => marker.type === 3))
            } catch (err) {
                console.log("Erro em getAllMarkers", err);
            }
        });
    }

    const handleTypeIcon = (markerType: any) => {
        return MARKER_ICON_TYPES[markerType]
    }

    useEffect(() => {
        try {
            coreHTTPClient.get(`classroom/`).then((response) => {
                setClassrooms(response.data);
            });
        } catch (err) {
            console.log("Erro em getClassrooms", err);
        }
    }, [])

    useEffect(()=>{
        return () => {
            clearInterval(intervalID)
        }
    },[intervalID])

    useEffect(() => {
        if (classrooms?.length > 0) {
            const id = setInterval(() => {
                classrooms.forEach((item: { schedules: string[], marker: MarkerProps }) => {
                    item.schedules.forEach((time) => {
                        var now = moment().second(0);
                        var hour = time.split(":")[0]
                        var minute = time.split(":")[1]

                        var timeToCompareEnd = moment().hour(parseInt(hour)).minute(parseInt(minute)).second(0);
                        var timetoCompareStart =  moment().hour(parseInt(hour)).minute(parseInt(minute)).second(0).subtract(30, 'minutes');

                        // if (true){
                        if (now.isBetween(timetoCompareStart, timeToCompareEnd)){
                            console.log("CLASS TIME!!");
                            setScheduleMarker((prevState: any)=>{
                                if (prevState?.id === item.marker.id){
                                    return undefined;
                                } else {
                                    return item.marker;
                                }
                            })
                            return;
                        }
                    })
                })
            }, 10000)
            setIntervalID(id);
        }
    }, [classrooms])

    useEffect(()=>{
        if (markers.length > 0 && scheduleMarker){
            const m = new google.maps.Marker({
                title: scheduleMarker.id + "-" + scheduleMarker.name,
                position: {
                    lat: parseFloat(scheduleMarker.latitude),
                    lng: parseFloat(scheduleMarker.longitude)
                },
                animation: google.maps.Animation.BOUNCE,
                // label: data.name,
                map: googleMap,//Objeto mapa
                icon: {
                    url: classIcon,
                    scaledSize: new google.maps.Size(50, 50)
                },
            })

            google.maps.event.addListener(m, 'click', function () {

                setClickedMarker(m);

                m.getAnimation() ? m.setAnimation(null) : m.setAnimation(google.maps.Animation.BOUNCE);
                setSelectedMarkerIcon(m.getIcon());
                setSelectedMarkerTitle(m.getTitle());
            });

            setClassMarker((prevState: any)=>{
                if(prevState) {
                    prevState.setMap(null);
                }
                return m;
            });
        }
    },[markers, scheduleMarker])

    useEffect(()=>{
        console.log({scheduleMarker});
    },[])

    useEffect(() => {
        if (reload.reload === true) {
            getAllMarkers();
            setReload({ reload: false, stateChange: null });
            setScheduleMarker(undefined);
            clearInterval(intervalID);
        }
    }, [reload]);

    useEffect(()=>{
        if (reload.reload === true){
            clearInterval(intervalID);
        }
    },[reload, intervalID])

    useEffect(() => {
        const socketIO = socketIo(socketURL);
        socketIO.on('new-marker', (data: any) => {
            const markersMapsFormat = []

            const m = new google.maps.Marker({
                title: data.id + "-" + data.name,
                position: {
                    lat: parseFloat(data.latitude),
                    lng: parseFloat(data.longitude)
                },
                animation: google.maps.Animation.DROP,
                // label: data.name,
                map: googleMap,//Objeto mapa
                icon: {
                    url: handleTypeIcon(data.type),
                    scaledSize: data.type !== 3 ? new google.maps.Size(45, 45) : new google.maps.Size(35, 35)
                },
            })

            markersMapsFormat.push(m)

            google.maps.event.addListener(m, 'click', function () {

                setClickedMarker(m);

                m.getAnimation() ? m.setAnimation(null) : m.setAnimation(google.maps.Animation.BOUNCE);
                setSelectedMarkerIcon(m.getIcon());
                setSelectedMarkerTitle(m.getTitle());
            });
        });
    }, [googleMap]);

    useEffect(
        () => {
            if (googleMap) {
                if (markers) {
                    // @ts-ignore
                    markers.forEach((marker, index) => {
                        if (handleFilter(filter, marker.type)) {
                            const markersMapsFormat = []

                            const m = new google.maps.Marker({
                                title: marker.id + "-" + marker.name,
                                position: {
                                    lat: parseFloat(marker.latitude),
                                    lng: parseFloat(marker.longitude)
                                },
                                // animation: google.maps.Animation.DROP,
                                // label: marker.name,
                                map: googleMap,//Objeto mapa
                                icon: {
                                    url: handleTypeIcon(marker.type),
                                    scaledSize: marker.type !== 3 ? new google.maps.Size(45, 45) : new google.maps.Size(35, 35)
                                },
                            })

                            markersMapsFormat.push(m)

                            google.maps.event.addListener(m, 'click', function () {

                                setClickedMarker(m);

                                if (m.getAnimation()) {
                                    m.setAnimation(null)
                                    setSelectedMarkerTitle(undefined);
                                } else {
                                    setSelectedMarkerTitle(m.getTitle());
                                    m.setAnimation(google.maps.Animation.BOUNCE)
                                }
                                // m.getAnimation() ? m.setAnimation(null) : m.setAnimation(google.maps.Animation.BOUNCE);
                                setSelectedMarkerIcon(m.getIcon());
                            });
                        }
                    })

                }
            }

        }, [markers, googleMap, filter]
    )

    useEffect(() => {

        if (clickedMarker && prevClickedMarker) {
            // @ts-ignore
            prevClickedMarker.setAnimation(null);
        }

    }, [clickedMarker])

    useEffect(() => {
        if (googleMap && !didMount) {
            setDidMount(true)
            getAllMarkers();
        }
    }, [googleMap])

    if (markers) {
        return (
            // Important! Always set the container height explicitly
            <>
                <MarkerSummary icon={selectedMarkerIcon} id_title={selectedMarkerTitle} />
                <ReloadFab action={reloadAllMarkers} isLoading={loading} />
                <GoogleMapReact
                    key={reload.stateChange}
                    bootstrapURLKeys={{
                        key: "AIzaSyAaZsfNRSww_QDtQJXRP-BsrXg83EKqoYw",
                        language: "pt",
                        region: "BR"
                    }}
                    onZoomAnimationEnd={(e) => {
                        if (e) {
                            setMapProps({ ...mapProps, zoom: e });
                        };
                    }}
                    onDrag={(e) => {
                        setMapProps({
                            center: {
                                lat: e.center.lat(),
                                lng: e.center.lng()
                            },
                            zoom: e.zoom
                        })
                    }}
                    options={defaultMapOptions}
                    defaultCenter={mapProps?.center ? mapProps.center : defaultProps.center}
                    defaultZoom={mapProps?.zoom ? mapProps?.zoom : defaultProps.zoom}
                    draggable={props.draggable !== undefined ? props.draggable : true}

                    onGoogleApiLoaded={({ map, maps }) => {
                        returnMyPositionMarker(map)
                        setGoogleMap(map)
                    }}
                >
                    
                </GoogleMapReact>
            </>
        );
    } else {
        return <CustomCircularProgress />
    }

}
