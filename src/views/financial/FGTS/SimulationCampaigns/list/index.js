/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Description } from '@mui/icons-material'; // Importar o ícone Description
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import ConfirmDialogDelete from "./Dialogs/ConfirmDialogDelete";
import ContinueDialogCampaign from "./Dialogs/ContinueDialogCampaign"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import api, { customApi } from 'utils/api';
import { formatDateToBrazilian } from 'utils/date';
import notify from 'utils/notify';

import * as XLSX from 'xlsx';

const SimulationCampaigns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [openDialogDeleteCampaign, setOpenDialogDeleteCampaign] = useState(false);
  const [openDialogContinueCampaign, setOpenDialogContinueCampaign] = useState(false);
  const [dataCampaign, setDataCampaign] = useState({});
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(false);

    showData();
  }, []);

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

  const generateXLSX = (query_data, name) => {
    const dateNow = getFormattedDateTime();

    const header = ['company', 'document', 'name', 'phone', 'guarantee_value', 'released_value', 'consultation_date', 'status'];
    const ws = XLSX.utils.json_to_sheet(query_data, { header });

    ws['A1'].v = 'EMPRESA';
    ws['B1'].v = 'CPF';
    ws['C1'].v = 'NOME';
    ws['D1'].v = 'TELEFONE';
    ws['E1'].v = 'SALDO GARANTIA';
    ws['F1'].v = 'SALDO LIBERADO';
    ws['G1'].v = 'DATA DA CONSULTA';
    ws['H1'].v = 'STATUS';

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });

    const s2ab = s => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };

    const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' });
    const fileName = `Relatório ${name} | ${dateNow}.xlsx`;
    if (window.navigator.msSaveOrOpenBlob) {
      // For IE
      window.navigator.msSaveBlob(blob, fileName);
    } else {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      document.body.appendChild(a);
      a.href = url;
      a.download = fileName;
      a.click();
      setTimeout(() => {
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      }, 0);
    }
  };

  const showData = async () => {
    const { data } = await api.get('/financial/fgts/show_campaigns');

    setRows(data);
  }

  const downloadExcel = async (uuid) => {
    const { data } = await api.get(`/financial/fgts/search_data/${uuid}`);

    generateXLSX(data.query_data, data.name);
  }

  const continueCampaign = async (instances) => {
    try {

      const response = await customApi.post(`${process.env.REACT_APP_API_URL_AUT}/start`, { uuid: dataCampaign.uuid, continue: true, instances });

      if (response.status == 200) {
        notify.success('Sucesso. Iniciando campanha');

        setDataCampaign({});
        handleDialogContinueCampaign();
        showData();
      }
    } catch (error) {
      notify.error(`Erro. ${error.response.data.message}`);
    }
  }

  const deleteCampaign = async () => {
    try {
      const response = await api.delete(`/financial/fgts/delete_campaign/${dataCampaign.uuid}`);

      if (response.status == 200) {
        notify.success('Sucesso. Campanha deletada');

        setDataCampaign({});
        handleDialogClose();
        showData();
      }
    } catch (error) {
      notify.error(`Erro. ${error.response.data.message}`);
    }
  }

  const handleDialogClose = () => {
    setOpenDialogDeleteCampaign(false);
  }

  const handleDialogContinueCampaign = () => {
    setOpenDialogContinueCampaign(false);
  }

  const getStatusStyles = (status, theme) => {
    switch (status) {
      case 'PROCESSANDO':
        return {
          backgroundColor: theme.palette.custom.purpleCustomLight,
          color: theme.palette.custom.purpleCustomDark,
        };
      case 'CANCELADA':
        return {
          backgroundColor: theme.palette.custom.redCustomLight,
          color: theme.palette.custom.redCustomDark,
        };
      case 'PARCIAL':
        return {
          backgroundColor: theme.palette.custom.blueCustomLight,
          color: theme.palette.custom.blueCustomDark,
        };
      default:
        return {
          backgroundColor: theme.palette.custom.greenCustomLight,
          color: theme.palette.custom.greenCustomDark,
        };
    }
  };

  const columns = [
    {
      field: 'name',
      align: 'left',
      headerName: 'Nome',
      maxWidth: 150
    },
    { field: 'company', align: 'left', headerName: 'Empresa', maxWidth: 200 },
    { field: 'records', align: 'center', headerName: 'Total de Registros', maxWidth: 150 },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      maxWidth: 150,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            ...getStatusStyles(row.status, theme),
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
    {
      field: 'created_at',
      align: 'left',
      headerName: 'Data De Criação',
      maxWidth: 150,
      renderCell: ({ row }) => formatDateToBrazilian(row.created_at)
    },
    { field: 'records_consulted', align: 'center', headerName: 'Registros Consultados', maxWidth: 170 },
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
              setOpenDialogDeleteCampaign(true);
              setDataCampaign(row);
            }}
          >
            <Tooltip title="Excluir Campanha">
              <DeleteIcon />
            </Tooltip>
          </Badge>
          <Badge
            color="success"
            style={{
              color: !row.query_data || !row.query_data.length ? '#B0B0B0' : '#95D062',
              cursor: 'pointer',
            }}
            onClick={() => {
              if (row.query_data && row.query_data.length)
                downloadExcel(row.uuid)
            }}
          >
            <Tooltip title="Download Excel">
              <Description />
            </Tooltip>
          </Badge>
          <Badge
            color="success"
            style={{
              color: '#8585E2',
              cursor: 'pointer',
            }}
            onClick={() => {
              setOpenDialogContinueCampaign(true);
              setDataCampaign(row);
            }}
          >
            <Tooltip title="Continuar consultas">
              <PlayArrowIcon />
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
            <ConfirmDialogDelete open={openDialogDeleteCampaign} handleClose={handleDialogClose} handleConfirm={deleteCampaign} />
            <ContinueDialogCampaign open={openDialogContinueCampaign} handleClose={handleDialogContinueCampaign} handleConfirm={continueCampaign} />
          </MainCard>
        </>
      )}
    </>
  );
};

export default SimulationCampaigns;
