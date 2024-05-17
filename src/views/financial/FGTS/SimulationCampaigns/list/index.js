/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { Badge, Grid, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import CustomDataGrid from 'ui-component/CustomDataGrid';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

const SimulationCampaigns = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  // Temporary data *****************************************************************************************

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
    { field: 'creation_date', align: 'left', headerName: 'Data De Criação', maxWidth: 200 }
  ];

  const rows = [
    {
      id: 1,
      name: 'Milena',
      company: 'Novo Rumo Empréstimos',
      records: 233,
      status: 'PROCESSANDO',
      creation_date: '2023-01-15T10:30:00Z'
    },
    {
      id: 2,
      name: 'Eduardo',
      company: 'Novo Rumo Empréstimos',
      records: 142,
      status: 'LIVRE',
      creation_date: '2023-02-20T14:45:00Z'
    },
    {
      id: 3,
      name: 'Carla',
      company: 'Financeira Boa Vista',
      records: 315,
      status: 'LIVRE',
      creation_date: '2023-03-10T09:20:00Z'
    },
    {
      id: 4,
      name: 'Felipe',
      company: 'Crédito Rápido',
      records: 87,
      status: 'PROCESSANDO',
      creation_date: '2023-04-05T11:00:00Z'
    },
    {
      id: 5,
      name: 'Ana',
      company: 'Empréstimos Seguros',
      records: 192,
      status: 'LIVRE',
      creation_date: '2023-05-12T16:15:00Z'
    }
  ];

  // ********************************************************************************************************

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
