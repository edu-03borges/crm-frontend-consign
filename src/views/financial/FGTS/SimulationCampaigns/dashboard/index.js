/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { gridSpacing } from 'store/constant';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

import ActiveSessions from './ActiveSessions';
import BatchQueries from './BatchQueries';
import ManualQueries from './ManualQueries';
import TotalQueries from './TotalQueries';

import api from 'utils/api';

const columns = [
  {
    field: 'instance',
    align: 'left',
    headerName: 'Instância',
    maxWidth: 150
  },
  { field: 'uuid', align: 'left', headerName: 'UUID', minWidth: 250 },
  // { field: 'document', align: 'left', headerName: 'Documento', minWidth: 250 },
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
  { field: 'time_logged_in', align: 'left', headerName: 'Tempo Logado', maxWidth: 170 }
];

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setLoading(false);

    showData()
  }, []);

  const showData = async () => {
    const { data } = await api.get('/financial/fgts/show_instances');

    setRows(data);
  } 

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
