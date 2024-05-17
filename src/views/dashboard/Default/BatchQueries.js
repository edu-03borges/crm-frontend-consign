import PropTypes from 'prop-types';

import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

import MainCard from 'ui-component/cards/MainCard';
import SkeletonCardsBox from 'ui-component/cards/Skeleton/CardsBox';

import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';

const CardWrapper = styled(MainCard)(() => ({
  //backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative'
}));

const BatchQueries = ({ isLoading }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonCardsBox />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: '#D6F6FD',
                        mt: 1
                      }}
                    >
                      <QueryBuilderIcon style={{ color: '#58B9D1' }} />
                    </Avatar>
                  </Grid>
                  <Grid item sx={{ ml: 2 }}>
                    <Typography sx={{ fontSize: 22, color: theme.palette.primary.dark, fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      15843
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: 18, color: theme.palette.primary.dark, fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      Total de consultas
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: theme.palette.grey[500]
                  }}
                >
                  Média de consultas (dia)
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

BatchQueries.propTypes = {
  isLoading: PropTypes.bool
};

export default BatchQueries;
