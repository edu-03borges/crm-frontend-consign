/* eslint-disable no-unused-vars */
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import * as XLSX from 'xlsx';

// Data Testing Temporary **************************************************************************
const columns = [
  { field: 'processo', align: 'left', headerName: 'PROCESSO', width: 230 },
  { field: 'nome', align: 'left', headerName: 'NOME', width: 250 },
  { field: 'cpfCnpj', align: 'left', headerName: 'CPF / CNPJ', width: 250 },
  { field: 'saldoTotal', align: 'left', headerName: 'SALDO TOTAL', width: 320 },
  { field: 'saldoRetorno', align: 'left', headerName: 'SALDO RETORNO', width: 320 },
  { field: 'data', align: 'left', headerName: 'DATA', width: 250 }
];

const rows = [
  {
    id: 1,
    processo: '215/14602',
    nome: 'ALISSON',
    cpfCnpj: '123.456.789-00',
    saldoTotal: 'R$ 855,33',
    saldoRetorno: 'R$ 612,64',
    data: '01/01/2021'
  }
];

const banks = [
  {
    id: 'none',
    name: 'Nenhum'
  },
  {
    id: 'c6Bank',
    name: 'C6 Bank'
  }
];
// *************************************************************************************************

const FgtsSimulation = () => {
  const { control, handleSubmit } = useForm();

  const [isLoading, setLoading] = useState(true);
  const [dataXlsx, setDataXlsx] = useState(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = async () => {
    await aut();
  };

  async function aut() {
    try {
      const data = { cpfs: dataXlsx };
      const response = await axios.post('http://127.0.0.1:3333/automations/mercantil_bank/automation', data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  async function handleFileUpload(ev) {
    ev.preventDefault();
    const reader = new FileReader();

    const columnHeaders = [];

    // setLoading(true);
    reader.onload = async (e) => {
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
          <Container maxWidth="xxl" sx={{ marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Simular Saldo
            </Typography>
          </Container>
          <MainCard>
            <Grid container>
              <Grid item xs={12}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ display: 'flex', gap: '20px' }}>
                    <Controller
                      name="bankFilter"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <TextField
                          {...field}
                          label="Banco"
                          select
                          SelectProps={{
                            variant: 'outlined'
                          }}
                          sx={{ width: '20%' }}
                        >
                          {banks.map((bank) => (
                            <MenuItem key={bank.id} value={bank.id}>
                              {bank.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    />
                    <Controller
                      name="cpfFilter"
                      control={control}
                      defaultValue=""
                      render={({ field }) => <TextField {...field} label="CPF" variant="outlined" sx={{ width: '35%' }} />}
                    />
                    <input hidden id="contained-button-file" type="file" accept=".xls,.xlsx" onChange={(e) => handleFileUpload(e)} />

                    <Button
                      variant="outlined"
                      startIcon={<CloudUploadOutlinedIcon />}
                      onClick={() => document.getElementById('contained-button-file').click()}
                      sx={{ width: '15%', ml: '15%' }}
                    >
                      <span>Carregar Arquivo</span>
                    </Button>

                    <Button type="submit" variant="contained" startIcon={<SearchIcon />} sx={{ width: '15%', ml: 'auto' }}>
                      Consultar
                    </Button>
                  </Box>
                </form>
                <Grid item xs={12} mt={2}>
                  <Box>
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
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          </MainCard>
        </>
      )}
    </>
  );
};

export default FgtsSimulation;
