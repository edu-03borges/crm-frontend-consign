/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, useMediaQuery, Tooltip } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import ConfirmDialogDelete from "./Dialogs/ConfirmDialogDelete";
import ConfirmDialogUpdateStatus from "./Dialogs/ConfirmDialogUpdateStatus";

import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';

import api from 'utils/api';
import notify from 'utils/notify';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [openDialogDeleteInstance, setOpenDialogDeleteInstance] = useState(false);
  const [openDialogUpdateStatusInstance, setOpenDialogUpdateStatusInstance] = useState(false);
  const [dataInstance, setDataInstance] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(false);

    showData()
  }, []);

  const showData = async () => {
    const { data } = await api.get('/financial/fgts/show_instances');

    setRows(data);
  } 

  const timeToWords = (milliseconds) => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let totalHours = Math.floor(totalMinutes / 60);
    let days = Math.floor(totalHours / 24);
  
    let hours = totalHours % 24;
    let minutes = totalMinutes % 60;
  
    let parts = [];

    if (days > 0) {
      parts.push(`${days} ${days === 1 ? 'Dia' : 'Dias'}`);
    }
    if (hours > 0) {
      parts.push(`${hours} ${hours === 1 ? 'hora' : 'horas'}`);
    }
    if (minutes > 0 || parts.length === 0) {
      parts.push(`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`);
    }
  
    return parts.join(' e ');
  }

  const deleteInstance = async () => {
    try {
      if (dataInstance.status == "EM USO") {
        notify.error(`Erro. Você não pode excluir uma instância em uso`);
        return;
      }

      const response = await api.delete(`/financial/fgts/delete_instance/${dataInstance.uuid}`);

      if (response.status == 200) {
        notify.success('Sucesso. Instância deletada');
  
        setDataInstance({});
        handleDialogCloseDelete();
        showData();
      }
    } catch (error) {
      notify.error(`Erro. ${error.response.data.message}`);
    }
  }

  const handleDialogCloseDelete = () => {
    setOpenDialogDeleteInstance(false);
  }

  const handleDialogCloseUpdateStatus = () => {
    setOpenDialogUpdateStatusInstance(false);
  }

  const updateStatusInstance = async (status) => {
    try {
      const response = await api.post(`/financial/fgts/update_status_instance/${dataInstance.uuid}`, { status });

      if (response.status == 200) {
        notify.success('Sucesso. Status da instância atualizado');
  
        setDataInstance({});
        handleDialogCloseUpdateStatus();
        showData();
      }
    } catch (error) {
      notify.error(`Erro. ${error.response.data.message}`);
    }
  }

  const columns = [
    {
      field: 'instance',
      align: 'left',
      headerName: 'Instância',
      maxWidth: 200
    },
    { field: 'uuid', align: 'left', headerName: 'UUID', maxWidth: 400 },
    { field: 'user', align: 'left', headerName: 'Usuário', maxWidth: 250 },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      maxWidth: 150,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            backgroundColor: row.status == 'EM USO' ? '#E7E8FD' : '#E7FBDE',
            color: row.status == 'EM USO' ? '#8585E2' : '#95D062',
            height: '1.7em',
            borderRadius: 3,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            padding: '0 0.8em',
            margin: '0.2em',
            fontSize: '0.9em',
            marginTop: '0px'
          }}
        >
          {row.status}
        </Badge>
      )
    },
    {
      field: 'actions',
      align: 'left',
      headerName: 'Ações',
      maxWidth: 100,
      renderCell: ({ row }) => (
        <>
          <Badge
          color="success"
          style={{
            color: theme.palette.error.main,
            cursor: 'pointer'
          }}
          onClick={() => {
            setOpenDialogDeleteInstance(true);
            setDataInstance(row);
          }}
        >
          <Tooltip title="Excluir Instância">
              <DeleteIcon />
          </Tooltip>
        </Badge>
        <Badge
          color="success"
          style={{
            color: '#5A9BD4',
            cursor: 'pointer'
          }}
          onClick={() => {
            setOpenDialogUpdateStatusInstance(true);
            setDataInstance(row);
          }}
        >
          <Tooltip title="Atualizar Status da Instância">
              <UpdateIcon />
          </Tooltip>
        </Badge>
        </>

      )
    },
  ];

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <MainCard sx={{ mt: 2 }}>
            <Grid container>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <Grid item xs={12}>
                    <CustomDataGrid
                      rows={rows}
                      columns={columns}
                      initialState={{
                        pagination: {
                          paginationModel: {
                            pageSize: 5
                          }
                        }
                      }}
                      pageSizeOptions={[5]}
                      disableRowSelectionOnClick
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <ConfirmDialogDelete open={openDialogDeleteInstance} handleClose={handleDialogCloseDelete} handleConfirm={deleteInstance} />
            <ConfirmDialogUpdateStatus open={openDialogUpdateStatusInstance} handleClose={handleDialogCloseUpdateStatus} handleConfirm={updateStatusInstance} />
          </MainCard>
        </>
      )}
    </>
  );
};

export default Dashboard;
