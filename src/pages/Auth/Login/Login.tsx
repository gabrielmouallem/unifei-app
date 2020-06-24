import React, { useState, useEffect } from 'react';
import './Login.scss';
import LogoWShaddow from '../../../assets/images/logo-w-shadow.png';
import { FormControl, InputLabel, Input, InputAdornment, IconButton, makeStyles, OutlinedInput, Button, Typography, Slide, Fade, Dialog, DialogContent } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons'
import LockIcon from '@material-ui/icons/Lock';
import PersonIcon from '@material-ui/icons/Person';
import GoogleIcon from '../components/GoogleIcon';
import { useHistory } from 'react-router-dom';
import routes from '../../../routes/routes';
import Register from '../Register/Register';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { coreHTTPClient } from '../../../services/webclient';
import useNotify from '../../../hooks/tools/useNotify';
import { useDispatch } from 'react-redux';
import { setToken } from '../../../redux/auth/actions';
import CustomCircularProgress from '../../../components/CustomCircularProgress/CustomCircularProgress';
import "@codetrix-studio/capacitor-google-auth";

import { Plugins } from '@capacitor/core';
const { GoogleAuth } = Plugins;

interface LoginProps {
    username: string;
    password: string;
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

const Transition = React.forwardRef<unknown, TransitionProps>(
    function Transition(props, ref) {
        return <Slide direction="up" ref={ref} {...props} />;
    }
);

export default () => {

    const classes = useStyles();

    const history = useHistory();

    const notify = useNotify();

    const dispatch = useDispatch();

    const [register, setRegister] = useState(false);

    const [loading, setLoading] = useState(false);

    const [values, setValues] = React.useState({
        username: '',
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

    async function passwordLogin() {
        await new Promise(async resolve => {
            try {
                const body = {
                    method: "password",
                    username: values.username,
                    password: values.password,
                }
                console.log(body)
                const response = await coreHTTPClient.post(`auth/`, body);
                const { token } = response.data;
                console.log(token)
                dispatch(setToken(token));

                notify("Logado com sucesso!", "success");
            } catch (err) {
                console.log("Erro em passwordLogin", err);
                notify("Ocorreu um erro ao entrar, verifique seu usuário e senha.", 'error');
            }
        });
    }

    async function googleSignOnOrLogin() {
        await new Promise(async resolve => {
            try {
                await handleGoogleLoginToken(
                    (googleUser) => {
                        const body = {
                            method: "google",
                            id_token: googleUser.authentication.idToken,
                            email: googleUser.email
                        }
                        console.log(body);
                        coreHTTPClient.post(`auth/`, body).then((response: any) => {
                            console.log(response)
                            const { token } = response.data;
                            dispatch(setToken(token));
                        }).catch(err => {
                            console.log("Erro em googleSignInOrLogin", err);
                            notify("Ocorreu um erro ao entrar com o Google.", 'error');
                        });
                        notify("Logado com sucesso!", "success");
                    }
                );
            } catch (err) {
                console.log("Erro em googleSignInOrLogin", err);
                notify("Ocorreu um erro ao entrar com o Google.", 'error');
            }
        });
    }

    async function handleGoogleLoginToken(callback: (data: any) => void) {
        GoogleAuth.signIn().then((res: any) => {
            callback(res);
        });
    }

    const handlePasswordLogin = () => {
        console.log(values)
        if (values.password === '' || values.username === '') {
            notify("Preencha os campos de usuário e senha.", 'error');
        } else {
            passwordLogin();
        }
    }

    if (!loading) {
        return (
            <>
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
                                        value={values.username}
                                        label="Usuário"
                                        onChange={handleChange('username')}
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
                            variant="contained"
                            onClick={() => {
                                handlePasswordLogin();
                            }}>
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
                            onClick={() => { googleSignOnOrLogin() }}
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
                        </button>
                    </div>
                    <div className="login__password-lost" style={{ textAlign: "center" }}
                        onClick={() => {
                            setRegister(true)
                        }} >
                        <Typography style={{ fontSize: "0.8em", fontWeight: "bold" }}>
                            Ainda não possui uma conta?
                        </Typography>
                        <Typography style={{ fontSize: "0.8em", fontWeight: "bold", color: "#3055D8" }}>
                            Crie Uma!
                        </Typography>
                    </div>
                </div>
                <Dialog
                    fullWidth
                    fullScreen
                    open={register}
                    TransitionComponent={Transition}
                    onClose={() => {
                        setRegister(!register)
                    }}
                    aria-labelledby="alert-dialog-slide-title-----"
                    aria-describedby="alert-dialog-slide-description----"
                >
                    <Register setOpen={setRegister} />
                </Dialog>
            </>
        );
    } else return <CustomCircularProgress />
}