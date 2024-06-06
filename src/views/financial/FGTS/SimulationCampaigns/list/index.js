/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Description } from '@mui/icons-material'; // Importar o ícone Description
import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

import api from 'utils/api';

const SimulationCampaigns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(false);

    showData();
  }, []);

  const showData = async () => {
    const { data } = await api.get('/financial/fgts/show_campaigns');

    setRows(data);
  } 

  const downloadExcel = async (uuid) => {
    const { data } = await api.get(`/financial/fgts/download_files/${uuid}`);

    const dateNow = getFormattedDateTime();
    
    downloadXLSX(data.xlsx_error, `cpfsComErros_${dateNow}`);
    downloadXLSX(data.xlsx_success, `cpfsComSaldos_${dateNow}`);
  }

  const downloadXLSX = (bufferBase64, filename) => {
    const byteCharacters = atob(bufferBase64);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);

    const blob = new Blob([byteArray], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);

    document.body.appendChild(link);
    link.click();

    window.URL.revokeObjectURL(url);
  };

  const getFormattedDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');

    const formattedDateTime = `${year}/${month}/${day} ${hour}:${minute}:${second}`;

    return formattedDateTime;
  };

  const columns = [
    {
      field: 'name',
      align: 'left',
      headerName: 'Nome',
      maxWidth: 200
    },
    { field: 'company', align: 'left', headerName: 'Empresa', minWidth: 200 },
    { field: 'records', align: 'left', headerName: 'Registros', minWidth: 200 },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      maxWidth: 200,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            backgroundColor: row.status == 'PROCESSANDO' ? '#E7E8FD' : row.status == 'CANCELADA' ? '#FDE7E7' : '#E7FBDE',
            color: row.status == 'PROCESSANDO' ? '#8585E2' : row.status == 'CANCELADA' ? '#E28585' : '#95D062',
            height: '1.7em',
            borderRadius: 3,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            padding: '0 0.8em',
            margin: '0.2em',
            fontSize: '0.9em',
            marginTop: '0px',
          }}
        >
          {row.status}
        </Badge>
      )
    },
    { field: 'created_at', align: 'left', headerName: 'Data De Criação', maxWidth: 200 },
    {
      field: 'file',
      align: 'left',
      headerName: 'Arquivo',
      maxWidth: 200,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            color: row.status != 'CONCLUÍDA' ? '#B0B0B0' : '#95D062',
            height: '1.7em',
            borderRadius: 3,
            display: 'inline-flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            padding: '0 0.8em',
            margin: '0.2em',
            fontSize: '0.9em',
            marginTop: '0px',
            cursor: 'pointer',
          }}
          onClick={() => {
            if (row.status == "CONCLUÍDA")
              downloadExcel(row.uuid)}}
        >
          <Tooltip title="Download Excel">
            <Description />
          </Tooltip>
        </Badge>
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
          </MainCard>
        </>
      )}
    </>
  );
};

export default SimulationCampaigns;
