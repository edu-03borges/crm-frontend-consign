import { Link } from 'react-router-dom';

import { Box, Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import AuthFooter from 'ui-component/cards/AuthFooter';
import AuthCardWrapper from '../AuthCardWrapper';
import AuthWrapper1 from '../AuthWrapper1';
import AuthLogin from '../auth-forms/AuthLogin';
import Logo from 'ui-component/Logo';

const Login = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1>
      <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container alignItems="center" justifyContent="center">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      marginBottom: '20px'
                    }}
                  >
                    <Link to="#">
                      <Logo />
                    </Link>
                  </Box>
                  <Grid item xs={12} sx={{ mt: 2 }}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={3}>
                          <Typography variant="caption" fontSize="16px" textAlign={matchDownSM ? 'center' : 'inherit'}>
                            Sistema Gerencial de Leads
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthLogin />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12} sx={{ mt: 1 }}>
                      <Typography variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Para Recuperar Acesso, Contate-nos.
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default Login;
