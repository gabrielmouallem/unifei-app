import React, { useState, useEffect } from 'react';
import './Register.scss';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, OutlinedInput, Button, Typography, Fade, Slide } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import GoogleIcon from '../components/GoogleIcon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import EmailIcon from '@material-ui/icons/Email';

interface Props {
    setOpen: (open: any) => void;
}

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

export default (props: Props) => {

    const classes = useStyles();

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

    return (
        <div className="register">
            <div
                className="register__back"
                onClick={() => {
                    props.setOpen(false)
                }}>
                <ArrowBackIcon />
            </div>
            <div className="register__title">
                <Typography
                    style={{
                        fontSize: "1.35em",
                        fontWeight: "bold",
                        color: "#0D2A54"
                    }}
                >
                    Criar Uma Conta
                    </Typography>
            </div>
            <div className="register__input">
                <span>
                    <PersonIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                </span>
                <div>
                    <div className={classes.root}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-username">
                                <div style={{ fontSize: "0.8em" }}>Usuário</div>
                            </InputLabel>
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
            <div className="register__input">
                <span>
                    <EmailIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                </span>
                <div>
                    <div className={classes.root}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-email">
                                <div style={{ fontSize: "0.8em" }}>Email</div>
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email"
                                type="text"
                                value={values.password}
                                label="Email"
                                onChange={() => { }}
                                labelWidth={70}
                            />
                        </FormControl>
                    </div>
                </div>
            </div>
            <div className="register__input">
                <span>
                    <LockIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                </span>
                <div>
                    <div className={classes.root}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">
                                <div style={{ fontSize: "0.8em" }}>Senha</div>
                            </InputLabel>
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
            <div className="register__input">
                <span>
                    <LockIcon style={{ opacity: "50%", fontSize: "36px", marginRight: "5vw" }} />
                </span>
                <div>
                    <div className={classes.root}>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-confirm-password">
                                <div style={{ fontSize: "0.8em" }}>Confirmar Senha</div>
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-confirm-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                label="Senha"
                                onChange={handleChange('password')}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle confirm password visibility"
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
            <div className="register__button">
                <Button
                    style={{
                        background: "#3055D8",
                        color: "white",
                        width: "100%",
                        fontSize: "0.8em",
                        height: "50px"
                    }}
                    variant="contained">
                    REGISTRAR
                </Button>
            </div>
            <div className="register__terms">
                <Typography
                    style={{
                        fontSize: "0.65em",
                        fontWeight: "bold",
                        textAlign: "center"
                    }}>
                    Ao registrar você está confirmando que concorda com nossos
                        <span style={{ color: "#FA610C" }}> Termos de Uso </span> e
                         <span style={{ color: "#FA610C" }}> Política de Privacidade </span>.
                    </Typography>
            </div>
            <div className="register__or-line">
                <Typography>
                    ou
                </Typography>
            </div>
            <div className="register__google-container">
                <button
                    type="button"
                    onClick={() => { }}
                    className="register__google-button"
                >
                    <div className="register__google-button__icon">
                        <GoogleIcon />
                    </div>
                    <div className="register__google-button__text">
                        <Typography>
                            Entrar com o Google
                        </Typography>
                    </div>
                    {/* <GlobalText content={TextContentID.LOGIN_GOOGLE_SIGN_IN} /> */}
                </button>
            </div>
            <div className="register__login">
                <Typography
                    style={{
                        fontSize: "0.8em",
                        fontWeight: "bold",
                    }}
                >
                    Já possui uma conta?
                    <div style={{ color: "#3055D8" }}>
                        Entre!
                    </div>
                </Typography>
            </div>
        </div>
    );
}