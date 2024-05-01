/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import CheckIcon from '@mui/icons-material/Check';

import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';

import { Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

const Histories = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataXlsx, setDataXlsx] = useState(null);

  const [returnResponse, setReturnResponse] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    setReturnResponse(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    await aut();
  };

  async function aut() {
    try {
      const data = { cpfs: dataXlsx || [] };
      const response = await axios.post('http://127.0.0.1:3333/automations/mercantil_bank/automation', data);

      const dateNow = getFormattedDateTime();

      downloadXLSX(response.data.cpfsComErros, `cpfsComErros_${dateNow}`);
      downloadXLSX(response.data.cpfsComSaldos, `cpfsComSaldos_${dateNow}`);

      setReturnResponse(response.data.status);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleFileUpload(ev) {
    ev.preventDefault();
    const reader = new FileReader();

    const columnHeaders = [];

    // setLoading(true);
    reader.onload = async () => {
      const fileData = reader.result;
      const wb = XLSX.read(fileData, { type: 'binary' });

      const sheet_name_list = wb.SheetNames;
      for (let sheetIndex = 0; sheetIndex < sheet_name_list.length; sheetIndex++) {
        const worksheet = wb.Sheets[sheet_name_list[sheetIndex]];

        let col = 0;
        for (const key in worksheet) {
          {
            if (col <= 78) {
              const key2 = key.substr(key.length - 1, 1);
              if (key2 == '1') columnHeaders.push(worksheet[key].v);
            }
          }
          col++;
        }
      }

      const first_worksheet = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(first_worksheet, { header: 0 });

      processExcel({ columnHeaders, data });
    };

    if (ev.target.files[0]) {
      reader.readAsBinaryString(ev.target.files[0]);
      setSelectedFile(ev.target.files[0]);
    } else {
      setLoading(false);
    }
  }

  async function processExcel({ data, columnHeaders }) {
    const columnNames = [];

    for (const info of data) {
      const obj = {};

      const header_cpf = columnHeaders[0];
      obj.cpf = info[header_cpf];

      columnNames.push(obj);
    }

    setDataXlsx(columnNames);
  }

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileExtension = (filename) => {
    return filename.slice(((filename.lastIndexOf('.') - 1) >>> 0) + 2);
  };

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
  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Simular Saldo
            </Typography>
          </Container>
          <MainCard>
            <Grid container>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <Typography variant="h3" color="secondary" hidden={returnResponse || !dataXlsx}>
                            Operação Concluída!
                          </Typography>
                        </Grid>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4} />
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2}>
                          <input
                            type="file"
                            id="contained-button-file"
                            accept=".xlsx,.xls,.csv,.txt,.rem"
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                          />
                          <Button
                            startIcon={selectedFile ? <CheckIcon /> : <UploadFileIcon />}
                            fullWidth
                            onClick={() => document.getElementById('contained-button-file').click()}
                            sx={{
                              height: theme.spacing(heightButton),
                              border: `1px solid ${selectedFile ? theme.palette.success.dark : theme.palette.primary.main}`,
                              color: selectedFile ? theme.palette.success.dark : theme.palette.primary.main
                            }}
                          >
                            {selectedFile ? 'Arquivo Enviado' : 'Enviar Arquivo'}
                          </Button>
                        </Grid>

                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 2}>
                          <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            startIcon={<SearchIcon />}
                            sx={{
                              backgroundColor: theme.palette.success.primary,
                              '&:hover': {
                                background: theme.palette.primary.dark,
                                color: theme.palette.primary.light
                              },
                              height: theme.spacing(heightButton)
                            }}
                          >
                            Consultar
                          </Button>
                        </Grid>
                      </Grid>

                      {/* {selectedFile ? (
                        <Grid container item spacing={2}>
                          <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 8} />
                          <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                            <Typography variant="body2" gutterBottom sx={{ color: 'text.primary' }}>
                              Tamanho: <span style={{ color: 'rgb(0, 128, 255)' }}>{formatFileSize(selectedFile.size)}</span>
                              &nbsp; Tipo: <span style={{ color: 'rgb(0, 128, 255)' }}>{getFileExtension(selectedFile.name)}</span>
                            </Typography>
                          </Grid>
                        </Grid>
                      ) : (
                        <></>
                      )} */}
                    </Grid>
                  </form>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default Histories;
