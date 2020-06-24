import React, { useState } from 'react';
import './MySchedule.scss';
import { Button } from '@material-ui/core';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
const { Filesystem } = Plugins;

export default () => {

  const [pdf, setPdf] = useState(undefined);

  async function fileRead() {
    let contents = await Filesystem.readFile({
      path: String('Sistema Integrado de Gestão de Atividades Acadêmicas.pdf'),
      directory: FilesystemDirectory.Documents,
      encoding: FilesystemEncoding.UTF8
    });
    // @ts-ignore
    setPdf(contents.data);
    alert(JSON.stringify(contents));
  }

  async function fileWrite() {
    try {
      const result = await Filesystem.writeFile({
        path: 'TESTANDO.txt',
        data: "This is a test",
        directory: FilesystemDirectory.Documents,
        encoding: FilesystemEncoding.UTF8
      })
      alert('Wrote file '+ JSON.stringify(result));
    } catch(e) {
      alert('Unable to write file ' + JSON.stringify(e));
    }
  }

  return (
    <AbsoluteWrapper>
      <div className="my-schedule">
        <Button variant="contained"
          onClick={() => {
            alert(String('Sistema Integrado de Gestão de Atividades Acadêmicas.pdf').replace(/ /g,"%20"))
            fileRead().then(res=>{
              alert(res)
            }).catch(err=>{
              alert(err)
            })
          }}>
                </Button>
      </div>
    </AbsoluteWrapper>
  )
}