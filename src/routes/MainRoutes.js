import { lazy } from 'react';

import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// FGTS
const DashboardCampaigns = Loadable(lazy(() => import('views/financial/FGTS/SimulationCampaigns/dashboard')));
const ListCampaigns = Loadable(lazy(() => import('views/financial/FGTS/SimulationCampaigns/list')));
const CreateCampaigns = Loadable(lazy(() => import('views/financial/FGTS/SimulationCampaigns/create')));
const CreateInstance = Loadable(lazy(() => import('views/financial/FGTS/Instance/create')));

const CpfDataCollect = Loadable(lazy(() => import('views/tools/DataCollect')));

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    // Dashboard

    {
      path: '/dashboard',
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
          path: 'campaign-dashboard',
          element: <DashboardCampaigns />
        },
        {
          path: 'campaigns-list',
          element: <ListCampaigns />
        },
        {
          path: 'campaign-create',
          element: <CreateCampaigns />
        },
        {
          path: 'instance-create',
          element: <CreateInstance />
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
