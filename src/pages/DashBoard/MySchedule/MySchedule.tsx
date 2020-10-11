import React, { useState, useEffect } from 'react';
import './MySchedule.scss';
import { Button } from '@material-ui/core';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { FileChooser } from '@ionic-native/file-chooser';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import BaseModal from '../../../components/BaseModal/BaseModal';
const { Filesystem } = Plugins;
const { Clipboard } = Plugins;

export default () => {

  const currentMonth = new Date().getMonth();

  const semester = currentMonth >= 6 ? 2 : 1;

  const [pdf, setPdf] = useState(undefined);

  const [open, setOpen] = useState(true);

  const history = useHistory();

  useEffect(() => {
    if (!open) {
      history.goBack();
    }
  }, [open])

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
              FileChooser.open()
                .then(uri => {
                  alert(uri);
                  var result = Filesystem.readFile({
                    path: uri,
                  }).then(res => {
                    
                  }).catch(err => {
                    
                  });
                })
                .catch(e => alert(e));
            }}>
            IMPORTAR
            </Button>
        </div>
      </BaseModal>
    </AbsoluteWrapper>
  )
}