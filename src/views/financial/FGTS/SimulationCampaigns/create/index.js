/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Button, Container, Grid, IconButton, MenuItem, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import CheckIcon from '@mui/icons-material/Check';

import UploadFileIcon from '@mui/icons-material/UploadFile';

const CriarCampanhas = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataXlsx, setDataXlsx] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    data.dateRange = selectedDateRange;

    console.log(data);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

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

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Criar Campanha
            </Typography>

            <IconButton aria-label="menu de opções" onClick={handleMenuOpen}>
              <MoreVertIcon />
            </IconButton>
          </Container>
          <MainCard>
            <Grid container>
              <Grid container item spacing={2}>
                <Grid item xs={12}>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                            NOME DA CAMPANHA
                          </Typography>
                          <TextField
                            label="Nome da Campanha"
                            name="search"
                            text
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                        <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                          EMPRESA
                        </Typography>
                        <TextField
                          label="Empresa"
                          name="units"
                          select
                          SelectProps={{
                            variant: 'outlined'
                          }}
                          fullWidth
                        >
                          <MenuItem value="emp1">Empresa 1</MenuItem>
                          <MenuItem value="emp2">Empresa 2</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid container item spacing={2}>
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
                            startIcon={<AddCircleOutlineIcon />}
                            fullWidth
                            sx={{
                              height: theme.spacing(heightButton)
                            }}
                          >
                            Criar Campanha
                          </Button>
                        </Grid>
                      </Grid>
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

export default CriarCampanhas;
