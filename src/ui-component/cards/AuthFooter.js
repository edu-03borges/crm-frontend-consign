import { Link, Stack, Typography } from '@mui/material';

const AuthFooter = () => (
  <Stack direction="row" justifyContent="space-between">
    <Typography
      variant="subtitle2"
      component={Link}
      href="https://www.instagram.com/edu_03borges/"
      target="_blank"
      underline="hover"
    >
      instagram.com/edu_03borges
    </Typography>
    {/* <Typography variant="subtitle2" component={Link} href="https://www.example.com" target="_blank" underline="hover">
      &copy; www.example.com
    </Typography> */}
  </Stack>
);

export default AuthFooter;
