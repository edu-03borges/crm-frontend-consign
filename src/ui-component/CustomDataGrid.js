import { DataGridPro, ptBR, useGridApiRef } from '@mui/x-data-grid-pro';
import { useEffect, useCallback, useRef, useState } from 'react';
import { Grid, useMediaQuery, IconButton, Box, Tooltip } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';

import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SaveIcon from '@mui/icons-material/Save';
import ReplayIcon from '@mui/icons-material/Replay';

import notify from 'utils/notify';

const StyledDataGridPro = styled(DataGridPro)({
  border: 0,
  fontSize: '12.5px',
  '.MuiDataGrid-filler': {
    backgroundColor: '#fdfdfd',
  },
  '.MuiDataGrid-columnHeader': {
    backgroundColor: '#fdfdfd',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
  },
  '.MuiDataGrid-columnHeaderTitle': {
    fontSize: '12.5px',
  },
  '.MuiDataGrid-cell': {
    borderBottom: '1px solid #f0f0f0',
  },
  '.MuiDataGrid-row:hover': {
    backgroundColor: '#f9f9f9',
  },
  '.MuiDataGrid-footer': {
    backgroundColor: '#f5f5f5',
  },
  '& .MuiDataGrid-columnHeader:focus, .MuiDataGrid-cell:focus': {
    outline: 'none',
  },
});

const CustomDataGrid = ({
  rows,
  columns,
  getRowId,
  loading,
  paginationModel,
  setPaginationModel,
  paginationMode,
  currentPage,
  getCountFull,
  enabledSaveState,
  callbackSetPage,
  rowCount,
  columnVisibilityModel,
  sortColumnDefault,
  onSortModelChange,
  hideFooter,
}) => {
  const apiRef = useGridApiRef();
  const [initialState, setInitialState] = useState(rows.initialState);
  const headerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const loadState = async () => {
      const stateRestore = await loadStateDataGrid();
      if (!isEmpty(stateRestore)) {
        apiRef.current.restoreState({
          columns: stateRestore.columns,
          pinnedColumns: stateRestore.pinnedColumns,
          sorting: stateRestore.sorting,
        });
      }
    };

    setInitialState(apiRef.current.exportState());
    loadState();
  }, []);

  const loadStateDataGrid = () => {
    const stringifiedState = localStorage.getItem(`dataGridState${name}`);
    return new Promise((resolve) => {
      if (!stringifiedState) {
        resolve({});
      } else {
        resolve(JSON.parse(stringifiedState));
      }
    });
  };

  const saveStateDataGrid = useCallback(() => {
    const currentState = apiRef.current.exportState();
    localStorage.setItem(`dataGridState${name}`, JSON.stringify(currentState));
    notify.success('Colunas salvas.');
  }, [apiRef]);

  const resetStateDataGrid = () => {
    apiRef.current.restoreState(initialState);
    localStorage.removeItem(`dataGridState${name}`);
    notify.success('Colunas resetadas.');
  };

  const isEmpty = (obj) => !Object.keys(obj).length;

  const TablePaginationActions = ({ count, page, rowsPerPage }) => {
    const handleFirstPageButtonClick = () => callbackSetPage(0);
    const handleBackButtonClick = () => callbackSetPage(currentPage - 1);
    const handleNextButtonClick = () => callbackSetPage(currentPage + 1);

    return (
      <Box sx={{ flexShrink: 0 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={currentPage <= 0}
          aria-label="First Page"
        >
          <FirstPageIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={currentPage <= 0}
          aria-label="Previous Page"
        >
          <KeyboardArrowLeft fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={
            getCountFull
              ? page >= Math.ceil(count / rowsPerPage) - 1
              : rows.length === 0 || rows.length < rowsPerPage
          }
          aria-label="Next Page"
        >
          <KeyboardArrowRight fontSize="small" />
        </IconButton>
        {enabledSaveState && (
          <>
            <Tooltip title="Save Columns" arrow>
              <IconButton
                className="ml-4"
                onClick={saveStateDataGrid}
                aria-label="Save"
              >
                <SaveIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Reset Columns" arrow>
              <IconButton
                className="mr-2"
                onClick={resetStateDataGrid}
                aria-label="Reset"
              >
                <ReplayIcon fontSize="small" color="primary" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Box>
    );
  };

  return (
    <Grid ref={headerRef}>
      <StyledDataGridPro
        apiRef={apiRef}
        loading={loading}
        initialState={{
          ...rows.initialState,
          sorting: {
            ...rows.initialState?.sorting,
            sortModel: [
              {
                field: sortColumnDefault,
                sort: 'asc',
              },
            ],
          },
          columns: {
            columnVisibilityModel: columnVisibilityModel || {},
          },
        }}
        slotProps={{
          pagination: () => {
            if (!paginationMode) {
              return {
                ActionsComponent: TablePaginationActions,
                labelDisplayedRows: ({ from, to, count }) => {
                  return getCountFull ? `${from}-${to} of ${count}` : null;
                },
              }
            }
          }
        }}
        density="standard"
        rows={rows}
        columns={columns}
        getRowId={getRowId}
        rowHeight={38}
        rowCount={rowCount}
        hideFooter={hideFooter}
        columnHeaderHeight={42}
        pageSizeOptions={[5, 10, 25, 50, 100]}
        sortingOrder={['asc', 'desc']}
        onSortModelChange={onSortModelChange}
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        paginationMode={paginationMode || 'server'}
        localeText={{
          ...ptBR.components.MuiDataGrid.defaultProps.localeText,
        }}
        hideScrollbar
        keepNonExistentRowsSelected
        disableRowSelectionOnClick
        disableSelectionOnClick
        autoHeight
        pagination
      />
    </Grid>
  );
};

export default CustomDataGrid;
