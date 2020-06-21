import React, { useState, useEffect } from 'react';
import './Profile.scss';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import BaseModal from '../../../components/BaseModal/BaseModal';
import { useHistory } from 'react-router-dom';
import { coreHTTPClient } from '../../../services/webclient';
import { Button, TextField } from '@material-ui/core';
import CustomCircularProgress from '../../../components/CustomCircularProgress/CustomCircularProgress';
import useNotify from '../../../hooks/tools/useNotify';
import { setProfile } from '../../../redux/profile/actions';
import { useDispatch } from 'react-redux';

interface ProfileProps {
    name: string,
    email: string,
    course: number,
    user_permissions: number,
    code: string
}

export default () => {

    const history = useHistory();

    const notify = useNotify();

    const dispatch = useDispatch();

    const [open, setOpen] = useState(true);

    const [profileID, setProfileID] = useState<any>(undefined);

    const [created, setCreated] = useState<any>(undefined);

    const [name, setName] = useState<any>(undefined);

    const handleNameChange = (event: any) => {
        setName(event.target.value);
    }

    const [loading, setLoading] = useState(true);

    const [email, setEmail] = useState<any>(undefined);

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    }

    const [course, setCourse] = useState<any>(0);

    const handleCourseChange = (event: any) => {
        setCourse(parseInt(event.target.value));
    }

    const [userPermissions, setUserPermissions] = useState<any>(0);

    const handleUserPermissionsChange = (event: any) => {
        setUserPermissions(parseInt(event.target.value));
    }

    const [code, setCode] = useState<any>(undefined);

    const handleCodeChange = (event: any) => {
        setCode(event.target.value);
    }

    async function createProfile(body: any) {
        setLoading(true);
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.post('profile/create/', body);
                notify('Perfil salvo com sucesso!', 'success');
                setLoading(false);
                dispatch(setProfile({
                    name: name,
                    course: course,
                    user_permissions: userPermissions,
                    email: email,
                    code: code
                }))
                history.push('/marker-list/');
            } catch (err) {
                notify('Erro ao salvar perfil.', 'error');
                setLoading(false);
                console.log("Erro em createProfile", err);
            }
        });
    }

    async function patchProfile(body: any) {
        setLoading(true);
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.patch(`profile/${profileID}/edit/`, body);
                notify('Perfil editado com sucesso!', 'success');
                setLoading(false);
                dispatch(setProfile({
                    name: name,
                    course: course,
                    user_permissions: userPermissions,
                    email: email,
                    code: code
                }))
                history.push('/marker-list/');
            } catch (err) {
                notify('Erro ao editar perfil.', 'error');
                setLoading(false);
                console.log("Erro em patchProfile", err);
            }
        });
    }


    async function getProfile() {
        await new Promise(async resolve => {
            try {
                setLoading(true);
                const response: any = await coreHTTPClient.get(`profile/`);
                setCreated(response.data.created)
                if (response.data.created){
                    setName(response.data.data.name)
                    setCourse(response.data.data.course)
                    setUserPermissions(response.data.data.user_permissions)
                    setCode(response.data.data.code)
                }
                setProfileID(response.data.data.id);
                setEmail(response.data.data.email);
                setLoading(false);
            } catch (err) {
                setLoading(false)
                console.log("Erro em getProfile", err);
            }
        });
    }

    useEffect(() => {
        getProfile();
    }, [])

    useEffect(() => {
        if (!open) {
            history.goBack();
        }
    }, [open])

    if (email) {
        return (
            <AbsoluteWrapper>
                <BaseModal setOpen={setOpen} title={"Meu Perfil"} closeIconDirection="down">
                    <div className="profile">
                        <TextField
                            style={{ width: "250px", marginBottom: "25px" }}
                            id="profile-1"
                            value={name}
                            onChange={handleNameChange}
                            label="Nome"
                            type="text"
                            variant="outlined" />
                        <TextField
                            style={{ width: "250px", marginBottom: "25px" }}
                            id="profile-4"
                            value={email}
                            onChange={handleEmailChange}
                            label="Email"
                            type="text"
                            variant="outlined" />
                        <TextField
                            id="profile-20"
                            select
                            label="Você é"
                            value={userPermissions}
                            onChange={handleUserPermissionsChange}
                            style={{ width: "250px", marginBottom: "25px" }}
                            SelectProps={{
                                native: true,
                            }}
                        >
                            <option key={0} value={0}>Aluno</option>
                            <option key={1} value={1}>Professor</option>
                            <option key={2} value={2}>Membro de CA/DA</option>
                        </TextField>
                        {
                            userPermissions === 1
                                ? <></>
                                : <TextField
                                    id="profile-3"
                                    select
                                    label="Seu curso"
                                    value={course}
                                    onChange={handleCourseChange}
                                    style={{ width: "250px", marginBottom: "25px" }}
                                    SelectProps={{
                                        native: true,
                                    }}
                                >
                                    <option key={0} value={0}>Administração</option>
                                    <option key={1} value={1}>Ciência da Computação</option>
                                    <option key={2} value={2}>Ciências Atmosféricas</option>
                                    <option key={3} value={3}>Ciências Biológicas Licenciatura</option>
                                    <option key={4} value={4}>Engenharia Ambiental</option>
                                    <option key={5} value={5}>Engenharia Civil</option>
                                    <option key={6} value={6}>Engenharia de Bioprocessos</option>
                                    <option key={7} value={7}>Engenharia de Computação</option>
                                    <option key={8} value={8}>Engenharia de Controle e Automação</option>
                                    <option key={9} value={9}>Engenharia de Energia</option>
                                    <option key={10} value={10}>Engenharia de Materiais</option>
                                    <option key={11} value={11}>Engenharia de Produção</option>
                                    <option key={12} value={12}>Engenharia Elétrica</option>
                                    <option key={13} value={13}>Engenharia Eletrônica</option>
                                    <option key={14} value={14}>Engenharia Hídrica</option>
                                    <option key={15} value={15}>Engenharia Mecânica</option>
                                    <option key={16} value={16}>Engenharia Mecânica Aeronáutica</option>
                                    <option key={17} value={17}>Engenharia Química</option>
                                    <option key={18} value={18}>Física Bacharelado</option>
                                    <option key={19} value={19}>Física Licenciatura</option>
                                    <option key={20} value={20}>Matemática Bacharelado</option>
                                    <option key={21} value={21}>Matemática Licenciatura</option>
                                    <option key={22} value={22}>Química Bacharelado</option>
                                    <option key={23} value={23}>Química Licenciatura</option>
                                    <option key={24} value={24}>Sistemas de Informação</option>
                                </TextField>
                        }
                        <TextField
                            style={{ width: "250px", marginBottom: "15px" }}
                            id="profile-4"
                            value={code}
                            onChange={handleCodeChange}
                            label={userPermissions === 1 ? "Código do Professor" : "Num. de Matrícula"}
                            type="text"
                            variant="outlined" />
                    </div>
                    <Button
                        style={{ width: "75%", marginTop: "20px" }}
                        variant="contained"
                        onClick={() => {
                            const body = {
                                name: name,
                                email: email,
                                course: course,
                                user_permissions: userPermissions,
                                code: code
                            }
                            console.log(body);
                            if (!name || !email || !code) {
                                notify('Por favor preencha todos os campos.', 'error');
                            } else {
                                if (created)
                                    patchProfile(body);
                                else
                                    createProfile(body);
                            }
                        }} >
                        SALVAR
                    </Button>
                </BaseModal>
            </AbsoluteWrapper>
        )
    } else return <CustomCircularProgress />
}