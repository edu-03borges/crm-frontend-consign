/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

import api from 'utils/api';

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
          backgroundColor: row.status == 'PROCESSANDO' ? '#E7E8FD' : '#E7FBDE',
          color: row.status == 'PROCESSANDO' ? '#8585E2' : '#95D062',
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
  { field: 'created_at', align: 'left', headerName: 'Data De Criação', maxWidth: 200 }
];

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
