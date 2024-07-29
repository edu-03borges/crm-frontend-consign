import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Container, Grid, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import * as XLSX from 'xlsx';

const columns = [
  { field: 'processo', headerName: 'PROCESSO', align: 'left', flex: 1 },
  { field: 'nome', headerName: 'NOME', align: 'left', flex: 1 },
  { field: 'cpfCnpj', headerName: 'CPF / CNPJ', align: 'left', flex: 1 },
  { field: 'saldoTotal', headerName: 'SALDO TOTAL', align: 'left', flex: 1 },
  { field: 'saldoRetorno', headerName: 'SALDO RETORNO', align: 'left', flex: 1 },
  { field: 'data', headerName: 'DATA', align: 'left', flex: 1 }
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

const handleFileUpload = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, { type: 'binary' });

    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
  };
  reader.readAsBinaryString(file);
};

const DataHygiene = () => {
  const { control, handleSubmit } = useForm();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = (data) => {
    
  };

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Higienização de Dados
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
                      paginationMode='client'
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

export default DataHygiene;
