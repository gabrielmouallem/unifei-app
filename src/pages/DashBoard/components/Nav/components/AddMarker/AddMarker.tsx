import React, { useState, useEffect } from 'react';
import './AddMarker.scss';
import { List, ListItem, Avatar, ListItemAvatar, ListItemText, Typography, Divider, makeStyles, MobileStepper, useTheme, Button, Fade, CircularProgress, FormControl, InputLabel, OutlinedInput, TextField } from '@material-ui/core';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import DirectionsIcon from '@material-ui/icons/Directions';
import EventNoteIcon from '@material-ui/icons/EventNote';
import RoomIcon from '@material-ui/icons/Room';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { Plugins, GeolocationOptions } from '@capacitor/core';
import Map from '../../../../MainDashboard/components/Map/Map';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { MARKER_TYPES, EVENT_TYPES, CONSTRUCTION_TYPES } from '../../../../../../utils/consts';
import useNotify from '../../../../../../hooks/tools/useNotify';
import { coreHTTPClient } from '../../../../../../services/webclient';
import AnimatedMarker from '../../../../../../assets/images/_animated-marker.gif';
import { useDispatch } from 'react-redux';

const { Geolocation } = Plugins;

interface Props {
    setOpen: (open: any) => void;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: "#F5F5F5",
    },
    inline: {
        display: 'inline',
    },
}));

export default (props: Props) => {

    const classes = useStyles();

    const notify = useNotify();

    const theme = useTheme();

    const dispatch = useDispatch();

    const [activeStep, setActiveStep] = React.useState(0);

    const [markerType, setmarkerType] = useState<any>(undefined);

    const [body, setBody] = useState<any>(undefined);

    const [latitude, setLatitude] = useState<any>('');
    const [longitude, setLongitude] = useState<any>('');

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

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const [id, setID] = useState<any>(undefined);


    const checkGenericMarkerValues = () => {
        if (values.name && values.description) {
            setBody(
                {
                    name: values.name,
                    description: values.description,
                    type: markerType,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
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
                    event_type: values.event_type,
                    event_date: values.event_date.toString(),
                    type: markerType,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
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
                    type: markerType,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
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
                    type: markerType,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
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
                    type: markerType,
                    latitude: latitude.toString(),
                    longitude: longitude.toString()
                }
            )
            return true
        } else return false
    }

    const handleMarkerRoute = () => {
        if (markerType === 0) return "StudyGroupMarker"
        if (markerType === 1) return "ExtraActivityMarker"
        if (markerType === 2) return "EventMarker"
        if (markerType === 3) return "GenericMarker"
        if (markerType === 4) return "ConstructionMarker"
    }

    const checkMarkerValues = () => {
        if (markerType === 0) checkStudyGroupMarkerMarkerValues()
        if (markerType === 1) checkExtraActivityMarkerValues()
        if (markerType === 2) checkEventMarkerValues()
        if (markerType === 3) checkGenericMarkerValues()
        if (markerType === 4) checkConstructionMarkerValues()
    }

    const handleNextStep = () => {
        if (markerType === 0 && checkStudyGroupMarkerMarkerValues()) {
            setActiveStep(activeStep + 1)
            return true
        }
        else if (markerType === 1 && checkExtraActivityMarkerValues()) {
            setActiveStep(activeStep + 1)
            return true
        }
        else if (markerType === 2 && checkEventMarkerValues()) {
            setActiveStep(activeStep + 1)
            return true
        }
        else if (markerType === 3 && checkGenericMarkerValues()) {
            setActiveStep(activeStep + 1)
            return true
        }
        else if (markerType === 4 && checkConstructionMarkerValues()) {
            setActiveStep(activeStep + 1)
            return true
        }
        else {
            notify("Erro. Verifique se você preencheu todos os campos e tente novamente.", 'error');
            return false;
        }
    }

    useEffect(() => {
        checkMarkerValues();
    }, [values])

    useEffect(() => {
        clearValues();
    }, [markerType])

    useEffect(() => {
        if (activeStep === 2) {
            setTimeout(() => {
                if (latitude && longitude) {
                    saveMarker();
                } else {
                    notify("Não foi possível obter sua localização atual.", 'error');
                    props.setOpen(false);
                }
            }, 8000)
        }
    }, [activeStep])

    async function saveMarker() {
        await new Promise(async resolve => {
            try {
                console.log(body)
                const response = await coreHTTPClient.post(`${handleMarkerRoute()}/create/`, body);
                console.log(response.data)
                notify("Marcador salvo com sucesso!", "success");
                props.setOpen(false);
            } catch (err) {
                console.log("Erro em saveMarker", err);
                notify("Ocorreu um erro ao salvar marcador, tente novamente.", 'error');
                props.setOpen(false);
            }
        });
    }

    const handleMarkerInputs = (markerType: number) => {
        if (markerType === 0) {
            return (
                <>
                    <div className="add-marker__input">
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
                    <div className="add-marker__input">
                        <TextField
                            style={{ width: "250px" }}
                            id="outlined-search1"
                            value={values.discipline}
                            onChange={handleChange('discipline')}
                            label="Disciplina"
                            type="text"
                            variant="outlined" />
                    </div>
                    <div className="add-marker__input">
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
                    <div className="add-marker__input">
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
                    <div className="add-marker__input">
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
                    <div className="add-marker__input">
                        <TextField
                            id="datetime-local"
                            label="Data do Evento"
                            style={{ width: "250px" }}
                            type="datetime-local"
                            value={values.event_date}
                            onChange={handleChange('event_date')}
                            defaultValue="2020-12-24T10:30"
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
                <div className="add-marker__input">
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
            <div className="add-marker__container">
                <div className="add-marker__marker-type">
                    {MARKER_TYPES[markerType]}
                </div>
                <div>
                    <div className="add-marker__input">
                        <TextField
                            style={{ width: "250px" }}
                            id="outlined-search"
                            value={values.name}
                            onChange={handleChange('name')}
                            label="Nome do Marcador"
                            type="text"
                            variant="outlined" />
                    </div>
                    {handleMarkerInputs(markerType)}
                    <div className="add-marker__input">
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
                </div>
            </div>
        )
    }

    async function getHighAccuracyPosition() {
        const options: GeolocationOptions = {
            enableHighAccuracy: true,
            timeout: 10000
        }
        const id = await Geolocation.watchPosition(options, (position, err) => {
            if (position) {
                console.log(position);
                setLatitude(position.coords.latitude.toFixed(7));
                setLongitude(position.coords.longitude.toFixed(7));
            }
            if (err) {
                notify("Erro ao obter localização.", 'error');
            }
        });
        setID(id);
    }

    useEffect(() => {
        if (activeStep === 0) {
            getHighAccuracyPosition();
        }
    }, [activeStep])

    useEffect(() => {
        if (id) {
            setTimeout(() => {
                Geolocation.clearWatch({ id: id });
            }, 3500)
        }

        return () => {
            console.log("clear watch")
            Geolocation.clearWatch({ id: id });
        }
    }, [id, activeStep])

    return (
        <div className="add-marker">
            <MobileStepper
                variant="dots"
                steps={3}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button
                        size="small"
                        disabled={activeStep === 0 || activeStep == 2}
                        style={{ marginRight: "15px" }}
                        onClick={() => {
                            handleNextStep();
                        }}>
                        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon style={activeStep === 0 ? { opacity: 0 } : {}} /> : <KeyboardArrowRightIcon style={activeStep === 0 ? { opacity: 0 } : {}} />}
                    </Button>
                }
                backButton={
                    <Button
                        size="small"
                        disabled={activeStep === 0 || activeStep === 2}
                        style={{ opacity: activeStep === 0 ? "0" : "1" }}
                        onClick={() => {
                            handleBack();
                            clearValues();
                        }}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                    </Button>
                }
            />
            {activeStep === 0
                ?
                <List className={classes.root}>
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "rgba(235, 222, 52, 0.1)" }}
                        onClick={() => {
                            handleNext();
                            setmarkerType(0)
                        }}>
                        <ListItemAvatar>
                            <MenuBookIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Grupo de Estudos"
                            secondary={
                                <React.Fragment>
                                    {"Chame outros alunos da universidade para estudarem com você baseado na sua localização!"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "rgba(3, 252, 23, 0.1)" }}
                        onClick={() => {
                            handleNext();
                            setmarkerType(1)
                        }}>
                        <ListItemAvatar>
                            <AccessibilityNewIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Atividades Extras"
                            secondary={
                                <React.Fragment>
                                    {"Chame outros alunos da universidade para realizar uma atividade com você baseado na sua localização!"}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "rgba(0, 0, 0, 0.1)" }}
                        onClick={() => {
                            handleNext();
                            setmarkerType(4)
                        }}>
                        <ListItemAvatar>
                            <DirectionsIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Sinalize Uma Obra"
                            secondary={
                                <React.Fragment>
                                    {'Se deparou com uma obra que atrapalhou seu caminho? Sinalize para que outros estudantes possam se desviar dela.'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "rgba(235, 110, 52, 0.1)" }}
                        onClick={() => {
                            handleNext();
                            setmarkerType(2)
                        }}>
                        <ListItemAvatar>
                            <EventNoteIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Eventos"
                            secondary={
                                <React.Fragment>
                                    {'Adicione seu próprio evento para que outros alunos e professores possam participar dele!'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    <ListItem alignItems="flex-start" style={{ backgroundColor: "rgba(3, 115, 252, 0.1)" }}
                        onClick={() => {
                            handleNext();
                            setmarkerType(3)
                        }}>
                        <ListItemAvatar>
                            <RoomIcon />
                        </ListItemAvatar>
                        <ListItemText
                            primary="Salas e Locais"
                            secondary={
                                <React.Fragment>
                                    {'Nos ajude adicionando novas salas e locais que ainda não estão registrados em nosso app!'}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </List>
                : null
            }
            {activeStep === 1 ?
                <Fade in={true} timeout={500}>
                    <div className="add-marker__step-2">
                        <div className="add-marker__map-container">
                            <div className="add-marker__map">
                                {handleMarkersForm()}
                            </div>
                        </div>
                    </div>
                </Fade>
                : null
            }
            {activeStep === 2 ?
                <Fade in={true} timeout={500}>
                    <div className="add-marker__step-2">
                        <div className="add-marker__map-container">
                            <img src={AnimatedMarker} alt="animated-marker" width="100%" />
                            <div className="add-marker__marker-type">
                                Obtendo sua localização...
                            </div>
                        </div>

                    </div>
                </Fade>
                : null
            }
        </div>
    )
}