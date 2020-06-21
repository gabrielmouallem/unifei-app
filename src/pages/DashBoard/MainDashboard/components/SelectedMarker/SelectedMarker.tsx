import React, { useState, useEffect } from 'react';
import './SelectedMarker.scss';
import { MARKER_ICON_TYPES, EVENT_TYPES, CONSTRUCTION_TYPES } from '../../../../../utils/consts';
import { Typography, Dialog, Slide, Fade, Button } from '@material-ui/core';
import moment from "moment";
import MarkerList from '../MarkerList/MarkerList';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import { coreHTTPClient } from '../../../../../services/webclient';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import { ApplicationState } from '../../../../../redux';
import { useSelector, useDispatch } from 'react-redux';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { useHistory, useParams } from 'react-router-dom';
import AbsoluteWrapper from '../../../../../components/AbsoluteWrapper/AbsoluteWrapper';


export interface SelectedMarkerParams {
    marker: string;
}

interface Props {
    markerID?: string;
}

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default (props: Props) => {

    const markerID = useParams<SelectedMarkerParams>().marker;

    console.log(markerID)

    const history = useHistory();

    const [marker, setMarker] = useState(undefined);

    const [markerInfos, setMarkerInfos] = useState<any>(undefined);

    var [open, setOpen] = useState(true);

    const dispatch = useDispatch();

    async function GetMarker() {
        await new Promise(async resolve => {
            try {
                const response = await coreHTTPClient.get(`markers/${markerID}/`);
                setMarker(response.data.data)
            } catch (err) {
                console.log("Erro em getMarker", err);
            }
        });
    }

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                history.goBack();
            }, 100)
        }
    }, [open])

    useEffect(() => {
        GetMarker();
    }, [])

    useEffect(() => {
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
    if (marker && (markerInfos || marker.type === 3)) {
        return (
            <AbsoluteWrapper>
                <div>
                    {/* 
                    // @ts-ignore */}
                    <BaseModal setOpen={setOpen} title={marker.name} closeIconDirection="down">
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
                            {
                                // @ts-ignore
                                marker.type === 0
                                    ? <Button
                                    style={{width: "90%", boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)"}}
                                        variant="contained">
                                        Confirmar Participação
                                        </Button>
                                    : <></>
                            }
                        </div>
                    </BaseModal>
                </div>
            </AbsoluteWrapper>
        )

    } else return <CustomCircularProgress />
}