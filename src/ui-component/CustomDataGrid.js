import { DataGridPro } from '@mui/x-data-grid-pro';
import { LicenseInfo } from '@mui/x-license';
import { useEffect, useRef, useState } from 'react';

import { Grid, useMediaQuery } from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';

const StyledDataGridPro = styled(DataGridPro)({
  border: 0,
  fontSize: '12.5px',
  '.MuiDataGrid-filler': {
    // backgroundColor: '#f5f5f5'
  },
  '.MuiDataGrid-columnHeader': {
    // backgroundColor: '#f5f5f5',
    color: '#333',
    display: 'flex',
    alignItems: 'center'
  },
  '.MuiDataGrid-columnHeaderTitle': {
    // fontSize: '12.5px',
    // fontWeight: 'bold'
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
  LicenseInfo.setLicenseKey('3a606f3b91b5cf1775c14b184cacd867Tz03NTMyNCxFPTE3MjcxMDQzOTEwMDAsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI=');

  const [adjustedColumns, setAdjustedColumns] = useState(columns);
  const headerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const resizeColumns = () => {
      if (!headerRef.current) return;
      const headerWidth = headerRef.current.offsetWidth;
      const columnCount = columns.length;
      let columnWidth = headerWidth / columnCount;
      if (isMobile) {
        columnWidth = Math.max(columnWidth, 180);
      }
      const newColumns = columns.map((column) => ({
        ...column,
        width: columnWidth
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
    <Grid ref={headerRef}>
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
