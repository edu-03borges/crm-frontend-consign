/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";

import { Badge, Grid, Tooltip, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Description } from '@mui/icons-material'; // Importar o ícone Description
import DeleteIcon from '@mui/icons-material/Delete';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import Loader from 'ui-component/Loader';
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
  const { userInfo } = useSelector(({ auth }) => auth);

  const [isLoading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(1);
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
    try {
      setLoading(true);
      setLoadingType(1);
  
      const response = await api.get('/tools/fgts_simulation_automation/show_campaigns');

      if (response && response.status === 200 && response.data) {
        setRows(response.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível listar as campanhas!`);
    }
  }

  const downloadExcel = async (uuid) => {
    try {
      setLoading(true);
      setLoadingType(2);

      const response = await api.get(`/tools/fgts_simulation_automation/search_data/${uuid}`);

      if (response && response.status === 200 && response.data) {
        generateXLSX(response.data.query_data, response.data.name);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível gerar a planilha!`);
    }
  }

  const continueCampaign = async (instances) => {
    try {
      setLoading(true);
      setLoadingType(2);

      const data = { idUser: userInfo.id, uuid: dataCampaign.uuid, continue: true, instances };

      const publicUrl = await getPublicUrl();

      const response = await customApi.post(`${publicUrl}/start`, data);

      if (response.status == 200) {
        notify.success('Sucesso. Iniciando campanha');

        setDataCampaign({});
        handleDialogContinueCampaign();
        showData();
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      notify.error(`Erro. ${error.response.data.message}`);
    }
  }

  async function getPublicUrl() {
    try {
      const response = await api.get(`/utils/get_public_url`);

      if (response && response.status === 200 && response.data) {
        return response.data;
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível pegar a url pública!`);
    }
  }

  const deleteCampaign = async () => {
    try {
      setLoading(true);
      setLoadingType(2);

      const response = await api.delete(`/tools/fgts_simulation_automation/delete_campaign/${dataCampaign.uuid}`);

      if (response.status == 200) {
        setLoading(false);
        setDataCampaign({});
        handleDialogClose();
        showData();

        notify.success('Sucesso. Campanha deletada');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível deletar a campanha!`);
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
      {isLoading ? loadingType == 1 ? (
        <GeneralSkeleton />
      ) : (
        <Loader />
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
