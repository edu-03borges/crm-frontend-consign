// material-ui
import { Link, Stack, Typography } from '@mui/material';

// ==============================|| FOOTER - AUTHENTICATION 2 & 3 ||============================== //

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://www.instagram.com/novorumoemprestimos/"
      target="_blank"
      underline="hover"
    >
      instagram.com/novorumoemprestimos
    </Typography>
    <Typography variant="subtitle2" component={Link} href="https://novorumoemprestimos.com.br/" target="_blank" underline="hover">
      &copy; novorumoemprestimos.com.br
    </Typography>
  </Stack>
);

export default AuthFooter;
