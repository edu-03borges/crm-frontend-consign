import { styled } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';
import { Menu, MenuItem } from '@mui/material';

export const StyledMenu = styled({
  paper: {
    border: '1px solid #d3d4d5',
    marginTop: '5px'
  }
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    PaperProps={{
      style: {
        padding: 0,
        paddingTop: 0,
        paddingBottom: 0
      }
    }}
    {...props}
  />
));

export const StyledMenuItemBlue = styled(MenuItem)(({ theme }) => ({
  fontSize: 13,
  margin: theme.spacing(0.2),
  marginLeft: theme.spacing(0.8),
  marginRight: theme.spacing(0.8),
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    color: blue[800],
    backgroundColor: blue[100]
  }
}));

export const StyledMenuItemGreen = styled(MenuItem)(({ theme }) => ({
  fontSize: 13,
  margin: theme.spacing(0.2),
  marginLeft: theme.spacing(0.8),
  marginRight: theme.spacing(0.8),
  borderRadius: theme.spacing(0.5),
  '&:hover': {
    color: green[800],
    backgroundColor: green[100]
  }
}));
