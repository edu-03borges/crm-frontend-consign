/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { gridSpacing } from 'store/constant';
import { Badge, Button, Container, Grid, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { Link } from 'react-router-dom';
import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

import TotalQueries from './TotalQueries';
import ActiveSessions from './ActiveSessions';
import BatchQueries from './BatchQueries';
import ManualQueries from './ManualQueries';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Temporary data *****************************************************************************************

  const columns = [
    {
      field: 'instancia',
      align: 'left',
      headerName: 'Instância',
      maxWidth: 150
    },
    { field: 'uuid', align: 'left', headerName: 'UUID', minWidth: 250 },
    { field: 'cpf', align: 'left', headerName: 'CPF', minWidth: 250 },
    {
      field: 'status',
      align: 'left',
      headerName: 'Status',
      maxWidth: 170,
      renderCell: ({ row }) => (
        <Badge
          color="success"
          style={{
            backgroundColor: row.status == 'LIVRE' ? '#E7E8FD' : '#E7FBDE',
            color: row.status == 'LIVRE' ? '#8585E2' : '#95D062',
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
    { field: 'tempo_logado', align: 'left', headerName: 'Tempo Logado', maxWidth: 170 }
  ];

  const rows = [
    {
      id: 1,
      instancia: 2,
      uuid: 'abc123def456',
      cpf: '123.456.789-00',
      status: 'PROCESSANDO',
      tempo_logado: '2 horas'
    },
    {
      id: 2,
      instancia: 3,
      uuid: 'def789ghi123',
      cpf: '987.654.321-00',
      status: 'LIVRE',
      tempo_logado: '1 hora'
    },
    {
      id: 3,
      instancia: 4,
      uuid: 'ghi456jkl789',
      cpf: '456.789.123-00',
      status: 'LIVRE',
      tempo_logado: '3 horas'
    },
    {
      id: 4,
      instancia: 4,
      uuid: 'jkl789mno456',
      cpf: '321.654.987-00',
      status: 'PROCESSANDO',
      tempo_logado: '1 hora'
    },
    {
      id: 5,
      instancia: 4,
      uuid: 'mno123pqr789',
      cpf: '789.123.456-00',
      status: 'PROCESSANDO',
      tempo_logado: '4 horas'
    }
  ];

  // ********************************************************************************************************

  return (
    <>
      {isLoading ? (
        <GeneralSkeleton />
      ) : (
        <>
          <Grid container>
            <Grid container item spacing={2}>
              <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                  <Grid item lg={3} md={6} sm={3} xs={2}>
                    <TotalQueries isLoading={isLoading} />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={2}>
                    <ActiveSessions isLoading={isLoading} />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={2}>
                    <BatchQueries isLoading={isLoading} />
                  </Grid>
                  <Grid item lg={3} md={6} sm={3} xs={2}>
                    <ManualQueries isLoading={isLoading} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
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

export default Dashboard;
