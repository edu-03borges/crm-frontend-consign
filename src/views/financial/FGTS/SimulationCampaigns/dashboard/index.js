/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

import ActiveSessions from './ActiveSessions';
import BatchQueries from './BatchQueries';
import ManualQueries from './ManualQueries';
import TotalQueries from './TotalQueries';


const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(false);
  }, []);

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

  const columns = [
    {
      field: 'column1',
      align: 'left',
      headerName: 'Coluna 1',
      width: 20
    },
    {
      field: 'column2',
      align: 'left',
      headerName: 'Coluna 2',
      width: 20
    },
    {
      field: 'column3',
      align: 'left',
      headerName: 'Coluna 3',
      width: 20
    },
    {
      field: 'column4',
      align: 'left',
      headerName: 'Coluna 4',
      width: 20
    },
    {
      field: 'column5',
      align: 'left',
      headerName: 'Coluna 5',
      width: 20
    },
    {
      field: 'column6',
      align: 'left',
      headerName: 'Coluna 6',
      width: 20
    },
  ]

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
