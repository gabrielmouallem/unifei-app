import React, { useEffect } from 'react';
import './MainDashboard.scss';

import Map from './components/Map/Map';
import TopTab from '../components/TopTab/TopTab';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { useHistory } from 'react-router-dom';
import { coreHTTPClient } from '../../../services/webclient';
import { useSetRecoilState } from 'recoil';
import { profileAtom } from '../../../recoils/profileRecoil';

export default () => {

    const history = useHistory();

    const setProfile = useSetRecoilState(profileAtom);

    async function getProfile() {
        await new Promise(async resolve => {
            try {
                const response: any = await coreHTTPClient.get(`profile/`);
                console.log(response)
                if (!response.data.created) {
                    history.push(
                        '/profile/'
                    )
                } else {
                    setProfile({
                        name: response.data.data.name,
                        course: response.data.data.course,
                        user_permissions: response.data.data.user_permissions,
                        email: response.data.data.email,
                        code: response.data.data.code
                    })
                }
            } catch (err) {
                console.log("Erro em getProfile", err);
            }
        });
    }

    useEffect(() => {
        getProfile();
    }, [])

    return (
        <AbsoluteWrapper>
            <div className="main-dashboard">
                <div className="main-dashboard__map-container">
                    <div className="main-dashboard__map">
                        <TopTab />
                    </div>
                </div>
            </div>
        </AbsoluteWrapper>
    )
}