import React, { useState, useEffect } from 'react';
import './SelectedMarker.scss';
import { MARKER_ICON_TYPES, EVENT_TYPES, CONSTRUCTION_TYPES } from '../../../../../utils/consts';
import { Typography } from '@material-ui/core';
import moment from "moment";
import MarkerList from '../MarkerList/MarkerList';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import { coreHTTPClient } from '../../../../../services/webclient';

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
    markerID?: string;
    setOpen: (open: any) => void;
}

export default (props: Props) => {

    const [marker, setMarker] = useState(undefined);

    const [markerInfos, setMarkerInfos] = useState<any>(undefined);

    async function GetMarker() {
        await new Promise(async resolve => {
            try {
                const response = await coreHTTPClient.get(`markers/${props.markerID}/`);
                setMarker(response.data.data)
            } catch (err) {
                console.log("Erro em getMarker", err);
            }
        });
    }

    useEffect(() => {
        GetMarker();
    }, [])

    useEffect(() => {
        console.log(marker)
        if (marker) {
            // @ts-ignore
            if (marker.type === 0) {          // Grupo de Estudos
                setMarkerInfos(
                    <>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Número de Participantes:
                        </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                1 / {marker.group_size}
                            </Typography>
                        </div>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Disciplina:
                            </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {marker.discipline}
                            </Typography>
                        </div>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Turma:
                            </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {marker.class_group}
                            </Typography>
                        </div>
                    </>
                )
                // @ts-ignore
            } else if (marker.type === 1) {   // Atividade Extra

                setMarkerInfos(
                    <>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Tipo de Atividade:
                            </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {marker.activity_type}
                            </Typography>
                        </div>
                    </>
                )
                // @ts-ignore
            } else if (marker.type === 2) {   // Eventos

                setMarkerInfos(
                    <>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Tipo de Evento:
                        </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {EVENT_TYPES[marker.event_type]}
                            </Typography>
                        </div>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Data:
                            </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {moment(marker.event_date).format("DD MMM HH:mm")}
                            </Typography>
                        </div>
                    </>
                )
                // @ts-ignore
            } else if (marker.type === 4) {   // Obra 

                setMarkerInfos(
                    <>
                        <div className="selected-marker__infos">
                            <Typography
                                style={{ fontWeight: "bold" }}>
                                Tipo de Obra:
                        </Typography>
                            <Typography>
                                {/* 
                                // @ts-ignore */}
                                {CONSTRUCTION_TYPES[marker.construction_type]}
                            </Typography>
                        </div>
                    </>
                )

            }
        }
    }, [marker])


    // @ts-ignore
    if (marker && (markerInfos || marker.type === 3))
        return (
            <div className="selected-marker">
                <div className="">

                </div>
                <div className="selected-marker__between-line">
                    {/* 
                                // @ts-ignore */}
                    <img src={MARKER_ICON_TYPES[marker.type]} />
                </div>
                <div className="selected-marker__infos">
                    <Typography>
                        {/* 
                                // @ts-ignore */}
                        {marker.description}
                    </Typography>
                </div>
                {markerInfos}
            </div>
        )
    else return <CustomCircularProgress />
}