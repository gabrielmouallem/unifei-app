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

  const [scheduleArray, setScheduleArray] = useState<any>(undefined);

  const [loading, setLoading] = useState(false);

  const postPdf = (pdf: any) => {
    coreHTTPClient.post(`pdf/`, pdf).then((res: any) => {
      setScheduleArray(res.data.data);
      localStorage.setItem("my-schedule", JSON.stringify(res.data));
    }).catch(err => {
      console.log("Erro em postPdf", err);
    }).finally(()=>{
      setLoading(false);
    })
  }

  useEffect(() => {
    var tempSchedule = localStorage.getItem("my-schedule");
    if (tempSchedule) {
      setScheduleArray(JSON.parse(tempSchedule));
    }
  }, [])

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
  }

  if (scheduleArray) {
    return (
      <AbsoluteWrapper>
        <BaseModal setOpen={setOpen} title={`Horários ${new Date().getFullYear()}.${semester}`} closeIconDirection="down">
          <div className="my-schedule">
            {scheduleArray.map((schedule: any, index: number) => {
              return (
              <ExpansionPanel style={{marginBottom: "15px", width: "70vw"}}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel1a-content-${index}`}
                  id={`panel1a-header-${index}`}
                >
                  <b>{schedule.codigo}</b>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {schedule.codigo_horario}{' - '}{schedule.local}
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
                    postPdf(res.data);
                  }).catch(err => {
                    notify("Erro ao importar PDF.", "error");
                  });
                })
                .catch(e => {

                })
            }}>
            IMPORTAR
            </Button>
        </div>
      </BaseModal>
    </AbsoluteWrapper>
  )
}