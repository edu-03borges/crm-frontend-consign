import { useState, useEffect  } from 'react';

import { Box, Button, Chip,  FormControl, InputLabel, MenuItem, Select, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

import api from 'utils/api';
import notify from 'utils/notify';

const ConfirmDialogUpdateStatus = ({ open, handleClose, handleConfirm }) => {

  const [selectedInstances, setSelectedInstances] = useState([]);
  const [instances, setInstances] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedInstances([]);
      showDataInstances();
    }
  }, [open]);

  const showDataInstances = async () => {
    try {
      const response = await api.get('/tools/fgts_simulation_automation/show_status_instances');
      
      if (response && response.status === 200 && response.data) {
        setInstances(response.data);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message)
        notify.error(`Erro. ${error.response.data.message}`);
      else
        notify.error(`Erro. Não foi possível listas as instâncias!`);
    }
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogContent style={{ width: 400 }}>
        <Typography variant="subtitle1" color="secondary" sx={{ mb: 1 }}>
          INSTÂNCIAS
        </Typography>
        <FormControl fullWidth variant="outlined">
          <InputLabel
            id="instances-label"
            shrink={false}
            style={{
              display: selectedInstances.length ? 'none' : 'block'
            }}
          >Instâncias</InputLabel>
          <Select
            labelId="instances-label"
            id="instances"
            multiple
            value={selectedInstances}
            onChange={(event) => setSelectedInstances(event.target.value)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={instances.find(option => option === value)?.instance} />
                ))}
              </Box>
            )}
          >
            {instances.map((option) => (
              <MenuItem key={option?.instance} value={option}>
                {option?.instance}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancelar
        </Button>
        <Button onClick={() => handleConfirm(selectedInstances)} color="primary" autoFocus>
          Continuar campanha
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialogUpdateStatus;
