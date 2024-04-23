import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

const FgtsSimulation = Loadable(lazy(() => import('views/financial/FGTS/FgtsSimulation')));
const CpfDataCollect = Loadable(lazy(() => import('views/tools/DataCollect')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // Dashboard

    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },

    // Financial - FGTS:

    {
      path: 'financial',
      children: [
        {
          path: 'fgts-simulation',
          element: <FgtsSimulation />
        }
      ]
    },

    // Tools - DataCollect:

    {
      path: 'tools',
      children: [
        {
          path: 'cpf-data-collect',
          element: <CpfDataCollect />
        }
      ]
    }
  ]
};

export default MainRoutes;
