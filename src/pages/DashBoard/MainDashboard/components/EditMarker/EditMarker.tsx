// @ts-nocheck
import React, { useState, useEffect, useCallback } from 'react';
import './EditMarker.scss';
import { TextField, Button } from '@material-ui/core';
import { EVENT_TYPES, CONSTRUCTION_TYPES, MARKER_TYPES } from '../../../../../utils/consts';
import AbsoluteWrapper from '../../../../../components/AbsoluteWrapper/AbsoluteWrapper';
import BaseModal from '../../../../../components/BaseModal/BaseModal';
import { useHistory, useParams } from 'react-router-dom';
import { SelectedMarkerParams } from '../SelectedMarker/SelectedMarker';
import { coreHTTPClient } from '../../../../../services/webclient';
import CustomCircularProgress from '../../../../../components/CustomCircularProgress/CustomCircularProgress';
import { MarkerProps } from '../../../../../models/markers';
import useNotify from '../../../../../hooks/tools/useNotify';

export default () => {

    const notify = useNotify();

    const [open, setOpen] = useState(true);

    const markerID = useParams<SelectedMarkerParams>().marker;

    const [marker, setMarker] = useState<MarkerProps>(undefined);

    const history = useHistory();

    const [body, setBody] = useState<any>(undefined);

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
        GetMarker();
    }, [])

    const [values, setValues] = useState<any>({
        name: null,
        description: '',

        event_type: 0,
        event_date: '',

        construction_type: 0,

        group_size: 5,
        discipline: '',
        class_group: '',

        activity_type: ''
    });

    const clearValues = () => {
        setValues({
            name: null,
            description: '',

            event_type: 0,
            event_date: '',

            construction_type: 0,

            group_size: 5,
            discipline: '',
            class_group: '',

            activity_type: ''
        })
    }

    const handleChange = (prop: any) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    useEffect(() => {
        if (marker) {
            if (marker.type === 0) {
                setValues({
                    name: marker.name,
                    description: marker.description,
                    event_type: 0,
                    event_date: '',

                    construction_type: 0,

                    group_size: marker.group_size,
                    discipline: marker.discipline,
                    class_group: marker.class_group,

                    activity_type: ''
                })
            }
            else if (marker.type === 1) {
                setValues({
                    name: marker.name,
                    description: marker.description,

                    event_type: 0,
                    event_date: '',

                    construction_type: 0,

                    group_size: 5,
                    discipline: '',
                    class_group: '',

                    activity_type: marker.activity_type
                })
            }
            else if (marker.type === 2) {
                setValues({
                    name: marker.name,
                    description: marker.description,

                    event_type: marker.event_type,
                    event_date: marker.event_date,

                    construction_type: 0,

                    group_size: 5,
                    discipline: '',
                    class_group: '',

                    activity_type: ''
                })
            }
            else if (marker.type === 3) {
                setValues({
                    name: marker.name,
                    description: marker.description,

                    event_type: 0,
                    event_date: '',

                    construction_type: 0,

                    group_size: 5,
                    discipline: '',
                    class_group: '',

                    activity_type: ''
                })
            }
            else if (marker.type === 4) {
                setValues({
                    name: marker.name,
                    description: marker.description,

                    event_type: 0,
                    event_date: '',

                    construction_type: marker.construction_type,

                    group_size: 5,
                    discipline: '',
                    class_group: '',

                    activity_type: ''
                })
            };
        }
    }, [marker])

    const checkGenericMarkerValues = () => {
        if (values.name && values.description) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    // @ts-ignore
                    type: marker.type,
                    // @ts-ignore
                    latitude: marker.latitude,
                    // @ts-ignore
                    longitude: marker.longitude
                }
            )
            return true
        } else return false
    }

    const checkEventMarkerValues = () => {
        if (checkGenericMarkerValues() && values.event_type !== undefined && values.event_date) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    // @ts-ignore
                    event_type: values.event_type,
                    // @ts-ignore
                    event_date: values.event_date.toString(),
                    // @ts-ignore
                    type: marker.type,
                    // @ts-ignore
                    latitude: marker.latitude,
                    // @ts-ignore
                    longitude: marker.longitude
                }
            )
            return true
        } else return false
    }

    const checkConstructionMarkerValues = () => {
        if (checkGenericMarkerValues() && values.construction_type !== undefined) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    construction_type: values.construction_type,
                    // @ts-ignore
                    type: marker.type,
                    // @ts-ignore
                    latitude: marker.latitude,
                    // @ts-ignore
                    longitude: marker.longitude
                }
            )
            return true
        } else return false
    }

    const checkStudyGroupMarkerMarkerValues = () => {
        if (checkGenericMarkerValues() && values.group_size && values.discipline && values.class_group) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    group_size: values.group_size,
                    discipline: values.discipline,
                    class_group: values.class_group,
                    // @ts-ignore
                    type: marker.type,
                    // @ts-ignore
                    latitude: marker.latitude,
                    // @ts-ignore
                    longitude: marker.longitude
                }
            )
            return true
        } else return false
    }

    const checkExtraActivityMarkerValues = () => {

        if (checkGenericMarkerValues() && values.activity_type) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    activity_type: values.activity_type,
                    // @ts-ignore
                    type: marker.type,
                    // @ts-ignore
                    latitude: marker.latitude,
                    // @ts-ignore
                    longitude: marker.longitude
                }
            )
            return true
        } else return false
    }

    const handleMarkerRoute = () => {
        // @ts-ignore
        if (marker.type === 0) return "StudyGroupMarker"
        // @ts-ignore
        if (marker.type === 1) return "ExtraActivityMarker"
        // @ts-ignore
        if (marker.type === 2) return "EventMarker"
        // @ts-ignore
        if (marker.type === 3) return "GenericMarker"
        // @ts-ignore
        if (marker.type === 4) return "ConstructionMarker"
    }

    const checkMarkerValues = useCallback(() => {
        if (marker && values) {
            // @ts-ignore
            if (marker.type === 0) checkStudyGroupMarkerMarkerValues()
            // @ts-ignore
            if (marker.type === 1) checkExtraActivityMarkerValues()
            // @ts-ignore
            if (marker.type === 2) checkEventMarkerValues()
            // @ts-ignore
            if (marker.type === 3) checkGenericMarkerValues()
            // @ts-ignore
            if (marker.type === 4) checkConstructionMarkerValues()
        }
    }, [values, marker])


    useEffect(() => {
        checkMarkerValues();
    }, [values])

    async function updateMarker() {
        await new Promise(async resolve => {
            try {
                console.log(body)
                // @ts-ignore
                const response = await coreHTTPClient.patch(`${handleMarkerRoute()}/${marker.id}/update/`, body);
                console.log(response.data)
                notify("Marcador editado com sucesso!", "success");
                history.goBack();
            } catch (err) {
                console.log("Erro em updateMarker", err);
                notify("Ocorreu um erro ao salvar marcador, tente novamente.", 'error');
            }
        });
    }

    const handleMarkerInputs = (markerType: number) => {
        if (markerType === 0) {
            return (
                <>
                    <div className="edit-marker__input">
                        <TextField
                            id="standard-select-currency-native0"
                            select
                            label="Tamanho do Grupo"
                            value={values.group_size}
                            onChange={handleChange('group_size')}
                            style={{ width: "250px" }}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option key={5} value={5}>5</option>
                            <option key={10} value={10}>10</option>
                            <option key={15} value={15}>15</option>
                            <option key={20} value={20}>20</option>
                        </TextField>
                    </div>
                    <div className="edit-marker__input">
                        <TextField
                            style={{ width: "250px" }}
                            id="outlined-search1"
                            value={values.discipline}
                            onChange={handleChange('discipline')}
                            label="Disciplina"
                            type="text"
                            variant="outlined" />
                    </div>
                    <div className="edit-marker__input">
                        <TextField
                            style={{ width: "250px" }}
                            value={values.class_group}
                            onChange={handleChange('class_group')}
                            id="outlined-search2"
                            label="Turma, ex: 1 ou 2 de cálculo"
                            type="text"
                            variant="outlined" />
                    </div>
                </>
            );
        } else if (markerType === 1) {
            return (
                <>
                    <div className="edit-marker__input">
                        <TextField
                            style={{ width: "250px" }}
                            id="outlined-search3"
                            value={values.activity_type}
                            onChange={handleChange('activity_type')}
                            label="Nome da Atividade"
                            type="text"
                            variant="outlined" />
                    </div>
                </>);
        } else if (markerType === 2) {
            return (
                <>
                    <div className="edit-marker__input">
                        <TextField
                            id="standard-select-currency-native1"
                            select
                            label="Tipo de Eventos"
                            style={{ width: "250px" }}
                            value={values.event_type}
                            onChange={handleChange('event_type')}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            {EVENT_TYPES.map(option => {
                                return (<option key={option} value={EVENT_TYPES.indexOf(option)}>{option}</option>)
                            })}
                        </TextField>
                    </div>
                    <div className="edit-marker__input">
                        <TextField
                            id="datetime-local"
                            label="Data do Evento"
                            style={{ width: "250px" }}
                            type="datetime-local"
                            value={values.event_date}
                            onChange={handleChange('event_date')}
                            defaultValue={marker.event_date}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </div>
                </>
            )
        } else if (markerType === 3) {
            return <></>
        } else if (markerType === 4) {
            return (
                <div className="edit-marker__input">
                    <TextField
                        id="standard-select-currency-native2"
                        select
                        style={{ width: "250px" }}
                        label="Tipo de Obra"
                        value={values.construction_type}
                        onChange={handleChange('construction_type')}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        {CONSTRUCTION_TYPES.map(option => {
                            return (<option key={option} value={CONSTRUCTION_TYPES.indexOf(option)}>{option}</option>)
                        })}
                    </TextField>
                </div>
            )
        }
    }

    const handleMarkersForm = () => {
        return (
            <div className="edit-marker__container">
                <div className="edit-marker__marker-type">
                    {/* 
                    // @ts-ignore */}
                    {MARKER_TYPES[marker.type]}
                </div>
                <div className="edit-marker__input">
                    <TextField
                        style={{ width: "250px" }}
                        id="outlined-search"
                        value={values.name}
                        onChange={handleChange('name')}
                        label="Nome do Marcador"
                        type="text"
                        variant="outlined" />
                </div>
                {/* 
                // @ts-ignore */}
                {handleMarkerInputs(marker.type)}
                <div className="edit-marker__input">
                    <TextField
                        style={{ width: "250px" }}
                        id="outlined-search"
                        value={values.description}
                        onChange={handleChange('description')}
                        label="Descrição"
                        type="text"
                        variant="outlined"
                        multiline
                        rows={5}
                        rowsMax={5} />
                </div>
                <Button
                    style={{ width: "80%", marginTop: "10px", alignSelf: "center", marginLeft: "15px" }}
                    variant="contained"
                    onClick={()=>{
                        updateMarker();
                    }}>
                    SALVAR
                </Button>
            </div>
        )
    }

    useEffect(() => {
        if (!open) {
            setTimeout(() => {
                history.goBack();
            }, 100)
        }
    }, [open])

    if (marker && values) {
        return (

                <div>
                    <BaseModal setOpen={setOpen} title="Editar Marcador" closeIconDirection="down">
                        <div className="edit-marker">
                            <div className="edit-marker__main">
                                <div className="edit-marker__map-container">
                                    <div className="edit-marker__map">
                                        {handleMarkersForm()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </BaseModal>
                </div>

        )
    } else return <CustomCircularProgress />

}
