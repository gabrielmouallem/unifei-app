import React, { useState, useEffect } from 'react';
import './MySchedule.scss';
import { Button, CircularProgress, Dialog, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, FormControl, NativeSelect, Slide } from '@material-ui/core';
import AbsoluteWrapper from '../../../components/AbsoluteWrapper/AbsoluteWrapper';
import { FileChooser } from '@ionic-native/file-chooser';
import { Plugins, FilesystemDirectory, FilesystemEncoding } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
import BaseModal from '../../../components/BaseModal/BaseModal';
import { coreHTTPClient } from '../../../services/webclient';
import useNotify from '../../../hooks/tools/useNotify';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useRecoilValue } from 'recoil';
import { markersAtom } from '../../../recoils/markersRecoil';
import { TransitionProps } from '@material-ui/core/transitions/transition';
import { MarkerProps } from '../../../models/markers';
const { Filesystem } = Plugins;

const Transition = React.forwardRef<unknown, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  }
);

export default () => {

  const notify = useNotify();

  const currentMonth = new Date().getMonth();

  const semester = currentMonth >= 6 ? 2 : 1;

  const [open, setOpen] = useState(true);

  const history = useHistory();

  const [scheduleArray, setScheduleArray] = useState<any>([]);

  const [loading, setLoading] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const [scheduleID, setScheduleID] = useState<any>(undefined);

  const [selectedClassroomID, setSelectedClassroomID] = useState<any>(undefined);

  const handleMarker = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedMarkerID(event.target.value as string);
  };

  const markers = useRecoilValue(markersAtom);

  const [selectedMarkerID, setSelectedMarkerID] = useState<any>(String(markers[0]?.id));

  const getSchedule = () => {
    setLoading(true);
    coreHTTPClient.get(`schedule/`).then((res: any) => {
      setScheduleArray(res.data.classrooms);
    }).catch(err => {
      notify('Erro ao carregar horários.', 'error');
    }).finally(() => {
      setLoading(false);
    })
  }

  const postPdf = (pdf: any) => {
    coreHTTPClient.post(`pdf/`, pdf).then((res: any) => {
      setScheduleID(res.data.data.id);
      getSchedule();
    }).catch(err => {
      console.log("Erro em postPdf", err);
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    console.log(selectedClassroomID, selectedMarkerID);
  }, [selectedClassroomID, selectedMarkerID])

  const addMarkerToClassroom = () => {
    console.log({
      marker_id: parseInt(selectedMarkerID),
      classroom_id: selectedClassroomID
    })
    coreHTTPClient.post(`schedule/classroom/marker/`, {
      marker_id: selectedMarkerID,
      classroom_id: selectedClassroomID
    }).then((res: any) => {
      getSchedule();
      setModalOpen(false);
      getSchedule();
    }).catch(err => {
      notify('Erro ao vincular marcador a uma sala', 'error');
      console.log("Erro em addMarkerToClassroom", err);
    }).finally(() => {
      setLoading(false);
    })
  }

  useEffect(() => {
    getSchedule();
  }, []);

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
      <>
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
                      <b>{schedule.content.name}</b>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                      <div>
                        <div style={{ display: "flex" }}>
                          <div className="container-row">
                            {schedule.content.schedules.map((time: any) => {
                              return <div style={{ marginRight: "5px" }}>{` ${time} `}</div>
                            })}
                          </div>
                          {schedule.content.classroom}
                        </div>
                        {
                          schedule.marker
                            ?
                            <>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
                                  margin: "10px 0 10px 0px",
                                  fontSize: "0.74em",
                                }}
                                onClick={() => {
                                  history.push(
                                    String('/markers/:marker').replace(':marker', `${schedule.marker}`)
                                  )
                                }}>
                                Ver Marcador
                              </Button>
                              <Button
                                variant="contained"
                                color="primary"
                                style={{
                                  margin: "10px 0 10px 0",
                                  fontSize: "0.74em",
                                  backgroundColor: "red"
                                }}
                                onClick={() => {
                                  // coreHTTPClient.post(`pdf/`, pdf).then((res: any) => {
                                  //   setScheduleID(res.data.data.id);
                                  //   getSchedule();
                                  // }).catch(err => {
                                  //   console.log("Erro em postPdf", err);
                                  // }).finally(() => {
                                  //   setLoading(false);
                                  // })
                                }}>
                                Desvincular
                              </Button>
                            </>
                            :
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => {
                                setSelectedClassroomID(schedule.id);
                                setModalOpen(true);
                              }}
                              style={{
                                margin: "10px 0 10px 0",
                                fontSize: "0.74em",
                                backgroundColor: "#52ac2b"
                              }}>
                              Vincular um Marcador
                            </Button>
                        }
                      </div>
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                )
              })}
            </div>
          </BaseModal>
        </AbsoluteWrapper>
        <Dialog
          fullWidth
          fullScreen
          open={modalOpen}
          TransitionComponent={Transition}
          keepMounted={false}
          onClose={() => {
            setModalOpen(false);
          }}
          aria-labelledby="alert-dialog-slide-title---"
          aria-describedby="alert-dialog-slide-description---"
        >
          <BaseModal setOpen={setModalOpen} title="Vincular Marcador">
            <div style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}>
              <FormControl>
                <NativeSelect
                  id="demo-customized-select-native"
                  value={selectedMarkerID}
                  onChange={handleMarker}
                >
                  {markers.map((value: MarkerProps) => {
                    return (
                      <option key={value.id} value={value.id}>
                        {value.name}
                      </option>
                    );
                  })}
                </NativeSelect>
              </FormControl>
              <Button
                variant="contained"
                color="default"
                style={{ marginTop: "50px" }} onClick={() => {
                  addMarkerToClassroom();
                }}>
                Vincular
              </Button>
            </div>
          </BaseModal>
        </Dialog>
      </>
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