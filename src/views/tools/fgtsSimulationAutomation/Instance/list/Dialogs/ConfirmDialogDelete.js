import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const ConfirmDialogDelete = ({ open, handleClose, handleConfirm }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Confirmação</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir essa instância?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogDelete;
