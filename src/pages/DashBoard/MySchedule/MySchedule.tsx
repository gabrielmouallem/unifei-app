import React, { useState, useEffect } from 'react';
import './MySchedule.scss';
import { Button, CircularProgress, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from '@material-ui/core';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { FileChooser } from '@ionic-native/file-chooser';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import BaseModal from '../../../components/BaseModal/BaseModal';
import { coreHTTPClient } from '../../../services/webclient';
import useNotify from '../../../hooks/tools/useNotify';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const { Filesystem } = Plugins;

export default () => {

  const notify = useNotify();

  const currentMonth = new Date().getMonth();

  const semester = currentMonth >= 6 ? 2 : 1;

  const [open, setOpen] = useState(true);

  const history = useHistory();

  const [scheduleArray, setScheduleArray] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const postPdf = (pdf: any) => {
    coreHTTPClient.post(`pdf/`, pdf).then((res: any) => {
      setScheduleArray(res.data.data);
    }).catch(err => {
      console.log("Erro em postPdf", err);
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading]);

  useEffect(() => {
    if (!open) {
      history.goBack();
    }
  }, [open])

  if (loading) {
    return (
      <AbsoluteWrapper>
        <BaseModal setOpen={setOpen} title={`Horários ${new Date().getFullYear()}.${semester}`} closeIconDirection="down">
          <div className="my-schedule">
            <CircularProgress style={{ color: "rgb(250, 97, 12)", opacity: "1 !important" }} />
          </div>
        </BaseModal>
      </AbsoluteWrapper>
    )
  } else if (scheduleArray?.length) {
    return (
      <AbsoluteWrapper>
        <BaseModal setOpen={setOpen} title={`Horários ${new Date().getFullYear()}.${semester}`} closeIconDirection="down">
          <div className="my-schedule">
            {scheduleArray.map((schedule: any, index: number) => {
              return (
                <ExpansionPanel style={{ marginBottom: "15px", width: "70vw" }}>
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={`panel1a-content-${index}`}
                    id={`panel1a-header-${index}`}
                  >
                    <b>{schedule.name}</b>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <div className="container-row">
                      {schedule.schedules.map((time: any) => {
                        return <div style={{ marginRight: "5px" }}>{` ${time} `}</div>
                      })}
                    </div>
                    {schedule.classroom}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              )
            })}
          </div>
        </BaseModal>
      </AbsoluteWrapper>
    )
  }

  return (
    <AbsoluteWrapper>
      <BaseModal setOpen={setOpen} title={`Horários ${new Date().getFullYear()}.${semester}`} closeIconDirection="down">
        <div className="my-schedule">
          <div className="my-schedule__empty">
            Você ainda não importou seus horários, gere seu atestado de matrícula no Sigaa em formato PDF
            e importe seus horário em nosso app clicando no botão abaixo.
            </div>
          <Button variant="contained" className="my-schedule__btn-add"
            onClick={() => {
              setLoading(true);
              FileChooser.open()
                .then(uri => {
                  Filesystem.readFile({
                    path: uri,
                  }).then(res => {
                    postPdf({ data: res.data });
                  }).catch(err => {
                    setLoading(false);
                    notify("Erro ao importar PDF.", "error");
                  });
                })
                .catch(e => {
                  setLoading(false);
                })
            }}>
            IMPORTAR
              </Button>
        </div>
      </BaseModal>
    </AbsoluteWrapper>
  )
}