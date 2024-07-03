import { useState } from 'react';

import { Button, Dialog, DialogActions, DialogContent, Typography, TextField , MenuItem, DialogTitle } from '@mui/material';

const ConfirmDialogUpdateStatus = ({ open, handleClose, handleConfirm }) => {

  const [status, setStatus] = useState("LIVRE");

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent>
        <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
          STATUS
        </Typography>
        <TextField
          label="Status"
          name="company"
          select
          style={{ width: 300 }}
          value={status}
          SelectProps={{
            variant: 'outlined'
          }}
          fullWidth
          onChange={(e) => setStatus(e.target.value)}
        >
          <MenuItem value="LIVRE">LIVRE</MenuItem>
          <MenuItem value="EM USO">EM USO</MenuItem>
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => handleConfirm(status)} color="primary" autoFocus>
          Atualizar Status
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogUpdateStatus;
