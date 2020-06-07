import React, { useState, useEffect } from 'react';
import './Login.scss';
import LogoWShaddow from '../../../assets/images/logo-w-shadow.png';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, OutlinedInput, Button, Typography, Slide, Fade } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import GoogleIcon from '../components/GoogleIcon';
import { useHistory } from 'react-router-dom';
import routes from '../../../routes/routes';
import Register from '../Register/Register';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        width: "215px",
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
}));

export default () => {

    const classes = useStyles();

    const history = useHistory();

    const [register, setRegister] = useState(false);

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false,
    });

    const handleChange = (prop: any) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
    };

    if(!register)
        return (
            <div className="login">
                <div className="login__logo">
                    <img src={LogoWShaddow} />
                </div>
                <div className="login__input">
                    <span>
                        <PersonIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                    </span>
                    <div>
                        <div className={classes.root}>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-username">Usuário</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-username"
                                    type="text"
                                    value={values.password}
                                    label="Usuário"
                                    onChange={() => { }}
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="login__input">
                    <span>
                        <LockIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                    </span>
                    <div>
                        <div className={classes.root}>
                            <FormControl variant="outlined">
                                <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    label="Senha"
                                    onChange={handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    labelWidth={70}
                                />
                            </FormControl>
                        </div>
                    </div>
                </div>
                <div className="login__button">
                    <Button
                        style={{
                            background: "#3055D8",
                            color: "white",
                            width: "100%",
                            fontSize: "0.8em",
                            height: "50px"
                        }}
                        variant="contained">
                        ENTRAR
                    </Button>
                </div>
                <div className="login__password-lost">
                    <Typography style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                        Esqueci Minha Senha
                    </Typography>
                </div>
                <div className="login__or-line">
                    <Typography>
                        ou
                    </Typography>
                </div>
                <div className="login__google-container">
                    <button
                        type="button"
                        onClick={() => { }}
                        className="login__google-button"
                    >
                        <div className="login__google-button__icon">
                            <GoogleIcon />
                        </div>
                        <div className="login__google-button__text">
                            <Typography>
                                Entrar com o Google
                            </Typography>
                        </div>
                        {/* <GlobalText content={TextContentID.LOGIN_GOOGLE_SIGN_IN} /> */}
                    </button>
                </div>
                <div className="login__register">
                    <Typography
                        style={{
                            fontSize: "0.8em",
                            fontWeight: "bold",
                        }}
                    >
                        Ainda não possui uma conta?
                        <div
                            style={{color: "#3055D8"}}
                            onClick={()=>{
                                setRegister(true)
                            }} >
                            Crie uma!
                        </div>
                    </Typography>
                </div>
            </div>
        );
    else return <Register register={register} setRegister={setRegister} />
}