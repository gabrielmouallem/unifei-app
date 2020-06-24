import React, { useState } from 'react';
import './MySchedule.scss';
import { Button } from '@material-ui/core';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;
const { Clipboard } = Plugins;

export default () => {

  const [pdf, setPdf] = useState(undefined);

  async function fileWrite() {
    try {
      const result = await Filesystem.writeFile({
        path: 'TESTE.PDF',
        data: "This is a test",
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      console.log('Wrote file', result);
    } catch(e) {
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

  return (
    <AbsoluteWrapper>
      <div className="my-schedule">
        <Button variant="contained"
          onClick={() => {
            alert(String('Sistema Integrado de Gestão de Atividades Acadêmicas.pdf').replace(/ /g, "%20"))
            fileRead().then(res => {
              alert(res)
            }).catch(err => {
              alert(err)
            })
          }}>
            ----------------- IMPORTAR -----------------
        </Button> 
      </div>
    </AbsoluteWrapper>
  )
}