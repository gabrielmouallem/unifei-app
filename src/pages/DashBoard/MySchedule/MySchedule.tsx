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

  async function fileWrite() {
    try {
      const result = await Filesystem.writeFile({
        path: 'TESTE.PDF',
        data: "This is a test",
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Wrote file', result);
    } catch (e) {
      console.error('Unable to write file', e);
    }
  }

  async function fileRead() {
    let contents = await Filesystem.readFile({
      path: String('Sistema Integrado de Gestão de Atividades Acadêmicas.pdf'),
      directory: FilesystemDirectory.Documents,
    });
    const result = await Filesystem.writeFile({
      path: 'TESTE4.PDF',
      data: contents.data,
      directory: FilesystemDirectory.Documents,
    })
    console.log('Wrote file', result);
  }

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
                    alert('Arquivo localizado ' + res);
                  }).catch(err => {
                    alert("Erro " + err);
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