import { Grid, useMediaQuery } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { useEffect, useRef, useState } from 'react';

const StyledDataGridPro = styled(DataGridPro)({
  border: 0,
  fontSize: '12.5px',
  '.MuiDataGrid-filler': {},
  '.MuiDataGrid-columnHeader': {
    color: '#333',
    display: 'flex',
    alignItems: 'center'
  },
  '.MuiDataGrid-cell': {
    borderBottom: '1px solid #f0f0f0'
  },
  '.MuiDataGrid-row': {
    '&:hover': {
      backgroundColor: '#f9f9f9'
    }
  },
  '.MuiDataGrid-footer': {
    backgroundColor: '#f5f5f5'
  },
  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
    outline: 'none'
  }
});

const CustomDataGrid = ({ rows, columns }) => {
  const [adjustedColumns, setAdjustedColumns] = useState(columns);
  const headerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const resizeColumns = () => {
      if (!headerRef.current) return;
      const headerWidth = headerRef.current.offsetWidth;
      const columnCount = columns.length;
      let columnFlex = headerWidth / columnCount;

      const newColumns = columns.map((column) => ({
        ...column,
        flex: 1, // Ajuste flexível
        minWidth: isMobile ? 180 : undefined // Define uma largura mínima para mobile
      }));
      setAdjustedColumns(newColumns);
    };

    resizeColumns();
    window.addEventListener('resize', resizeColumns);
    return () => {
      window.removeEventListener('resize', resizeColumns);
    };
  }, [columns, isMobile]);

  return (
    <Grid ref={headerRef} style={{ width: '100%' }}>
      <StyledDataGridPro
        density="standard"
        rows={rows}
        rowHeight={38}
        columns={adjustedColumns}
        columnHeaderHeight={42}
        pageSize={5}
        disableRowSelectionOnClick
        disableSelectionOnClick
        autoHeight
        localeText={{
          footerTotalRows: 'Total de Linhas:'
        }}
      />
    </Grid>
  );
};

export default CustomDataGrid;
