import React, { useState, useEffect } from 'react';
import './Register.scss';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, OutlinedInput, Button, Typography, Fade, Slide } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import GoogleIcon from '../components/GoogleIcon';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import EmailIcon from '@material-ui/icons/Email';
import useNotify from '../../../hooks/tools/useNotify';
import { coreHTTPClient } from '../../../services/webclient';
import CustomCircularProgress from '../../../components/CustomCircularProgress/CustomCircularProgress';

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

    const notify = useNotify();

    const [values, setValues] = React.useState({
        username: '',
        email: '',
        password1: '',
        password2: '',
    });

    const handleChange = (prop: any) => (event: { target: { value: any; }; }) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const validateEmailFormat = (email: string) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(String(email).toLowerCase());
    }

    async function doRegister() {
        await new Promise(async resolve => {
            try {
                const body = {
                    username: values.username,
                    password: values.password2,
                    email: values.email
                }
                console.log(body)
                const response = await coreHTTPClient.post(`auth/register/`, body);
                notify("Registrado com sucesso!", "success");
                props.setOpen(false);
            } catch (err) {
                console.log("Erro em doRegister", err);
                notify("Ocorreu um erro ao registrar.", 'error');
            }
        });
    }

    return (
        <div className="register">
            <div
                className="register__back"
                onClick={() => {
                    props.setOpen(false)
                }}>
                <KeyboardArrowDownIcon />
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
                                value={values.username}
                                label="Usuário"
                                onChange={handleChange('username')}
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
                                value={values.email}
                                label="Email"
                                onChange={handleChange('email')}
                                error={validateEmailFormat(values.email)}
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
                            <InputLabel htmlFor="outlined-adornment-password1">
                                <div style={{ fontSize: "0.8em" }}>Senha</div>
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password1"
                                type={'password'}
                                value={values.password1}
                                label="Senha"
                                onChange={handleChange('password1')}
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
                                type={'password'}
                                value={values.password2}
                                label="Senha"
                                onChange={handleChange('password2')}
                                error={values.password1 !== values.password2}
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
                    variant="contained"
                    onClick={() => {
                        if (values.password1 !== values.password2 || validateEmailFormat(values.email)) {
                            notify("Erro! Verifique os campos em vermelho.", `error`);
                        } else {
                            doRegister();
                        }
                    }}>
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
            <div className="register__login" style={{ textAlign: "center" }}
                onClick={() => {
                    props.setOpen(false)
                }} >
                <Typography style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                    Já possui uma conta?
                        </Typography>
                <Typography style={{ fontSize: "0.8em", fontWeight: "bold", color: "#3055D8" }}>
                    Entre!
                </Typography>
            </div>
        </div>
    );
}