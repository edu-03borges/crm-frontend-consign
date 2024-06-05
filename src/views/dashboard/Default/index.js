/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

import { useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import GeneralSkeleton from 'ui-component/cards/Skeleton/GeneralSkeleton';

const Dashboard = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return <>{isLoading ? <GeneralSkeleton /> : <></>}</>;
};

export default Dashboard;
