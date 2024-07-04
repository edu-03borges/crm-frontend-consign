import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Container, Grid, TextField, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { heightButton } from 'store/constant';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MainCard from 'ui-component/cards/MainCard';
import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';
import Loader from 'ui-component/Loader';

import api from 'utils/api';
import notify from 'utils/notify';

const CriarCampanhas = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();

  const [isLoading, setLoading] = useState(true);
  const [loadingType, setLoadingType] = useState(1);

  useEffect(() => {
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = {};

    formData.forEach((value, key) => {
      data[key] = value;
    });

    if (!data.instance) {
        notify.error('Erro. Preencher o número da instância');
        return;
      }
    
    if (!data.user) {
      notify.error('Erro. Preencher o usuário');
      return;
    }
    
    if (!data.password) {
      notify.error('Erro. Preencher a senha');
      return;
    }
    
    try {
      setLoading(true);
      setLoadingType(2);

      const response = await api.post('/tools/fgts_simulation_automation/create_instance', data);

      if (response.status == 200) {
        navigate('/tools/fgts-simulation-automation/instance-list');

        setLoading(false);

        notify.success('Sucesso. Instância criada');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível criar a instância!`);
    }
  };

  return (
    <>
      {isLoading ? loadingType == 1 ? (
        <GeneralSkeleton />
      ) : (
        <Loader />
      ) : (
        <>
          <Container maxWidth="xxl" sx={{ display: 'flex', justifyContent: 'space-between', marginLeft: '-10px', marginBottom: '10px' }}>
            <Typography variant="h2" color="secondary">
              Criar Instância
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
                          <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                            NÚMERO DA INSTÂNCIA
                          </Typography>
                          <TextField
                            label="Número da Instância"
                            name="instance"
                            type="number"
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                        <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                          USUÁRIO
                        </Typography>
                        <TextField
                          label="Usuário"
                          name="user"
                          text
                          SelectProps={{
                            variant: 'outlined'
                          }}
                          fullWidth
                        />
                      </Grid>
                      <Grid container item spacing={2}>
                        <Grid item xs={isMobile ? 12 : 0} md={isMobile ? 12 : 4}>
                          <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
                            SENHA
                          </Typography>
                          <TextField
                            label="Senha"
                            name="password"
                            text
                            SelectProps={{
                              variant: 'outlined'
                            }}
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Grid container item spacing={2}>
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
                            Criar Instância
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
