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
const { Geolocation } = Plugins;

interface Props {
    open: boolean;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
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

    const [loading, setLoading] = useState(false);

    const [activeStep, setActiveStep] = React.useState(0);

    const [markerType, setmarkerType] = useState<any>(undefined);

    const [body, setBody] = useState<any>(undefined);

    const [latitude, setLatitude] = useState<any>('');
    const [longitude, setLongitude] = useState<any>('');

    const [values, setValues] = useState<any>({
        name: null,
        description: '',

        event_type: null,
        event_date: '',

        construction_type: null,

        group_size: null,
        discipline: '',
        class_group: '',

        activity_type: ''
    });

    const handleChange = (prop: any) => (event: { target: { value: any; }; }) => {
        console.log('teste')
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
        console.log("Checking gereric")
        if (values.name && values.description){
            console.log("approved")
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
        }
    }

    const checkEventMarkerValues = () => {
        if (checkGenericMarkerValues() && values.event_type && values.event_date){
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
        }
    }

    const checkConstructionMarkerValues = () => {
        if (checkGenericMarkerValues() && values.construction_type){
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
        }
    }

    const checkStudyGroupMarkerMarkerValues = () => {
        if (checkGenericMarkerValues() && values.group_size && values.discipline && values.class_group){
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
        }
    }

    const checkExtraActivityMarkerValues = () => {

        if (checkGenericMarkerValues() && values.activity_type){
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
        }
    }

    const handleMarkerRoute = () => {
        if (markerType === 0) return "StudyGroupMarker"
        if (markerType === 1) return "ExtraActivityMarker"
        if (markerType === 2) return "EventMarker"
        if (markerType === 3) return "GenericMarker"
        if (markerType === 4) return "ConstructionMarker"
    }

    useEffect(()=>{
        if (markerType === 0) checkStudyGroupMarkerMarkerValues()
        if (markerType === 1) checkExtraActivityMarkerValues()
        if (markerType === 2) checkEventMarkerValues()
        if (markerType === 3) checkGenericMarkerValues()
        if (markerType === 4) checkConstructionMarkerValues()
    }, [values])

    async function saveMarker() {
        console.log("markerType ", markerType)

        await new Promise(async resolve => {
            setLoading(true)
            try {
                console.log(body)
                const response = await coreHTTPClient.post(`${handleMarkerRoute()}/create/`, body);
                setLoading(false);
                console.log(response.data)
                notify("Marcador salvo com sucesso!", "success");
            } catch (err) {
                setLoading(false);
                console.log("Erro em saveMarker", err);
                notify("Ocorreu um erro ao salvar marcador, tente novamente.", 'error');
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
                                return (<option key={option} value={option}>{option}</option>)
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
                            return (<option key={option} value={option}>{option}</option>)
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
        if (activeStep === 1) {
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
                steps={2}
                position="static"
                activeStep={activeStep}
                className={classes.root}
                nextButton={
                    <Button size="small" disabled={activeStep !== 1 || (!latitude && !longitude)}
                        onClick={()=>{
                            saveMarker()
                        }}>
                        Finalizar
                        {theme.direction === 'rtl' ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                    </Button>
                }
                backButton={
                    <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                        {theme.direction === 'rtl' ? <KeyboardArrowRightIcon /> : <KeyboardArrowLeftIcon />}
                        Voltar
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
                : <></>
            }
            {activeStep === 1 ?
                <div className="add-marker__step-2">
                    <div className="add-marker__map-container">
                        <div className="add-marker__map">
                            {
                                latitude && longitude ?
                                    <Map zoom={40} center={
                                        {
                                            lat: parseFloat(latitude),
                                            lng: parseFloat(longitude)
                                        }
                                    }
                                        satellite={true}
                                        disableUI={true}
                                        draggable={false} />
                                    :
                                    <CircularProgress
                                        style={{
                                            width: "50px",
                                            marginTop: "30px",
                                            marginLeft: "42%"
                                        }} />
                            }
                            {handleMarkersForm()}
                        </div>
                    </div>
                </div>
                : <></>
            }
        </div>
    )
}