import { lazy } from 'react';

import Loadable from 'ui-component/Loadable';
import ProtectedRoute from './ProtectedRoute';

const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// FGTS
const DashboardCampaigns = Loadable(lazy(() => import('views/tools/fgtsSimulationAutomation/Campaigns/dashboard')));
const ListCampaigns = Loadable(lazy(() => import('views/tools/fgtsSimulationAutomation/Campaigns/list')));
const CreateCampaigns = Loadable(lazy(() => import('views/tools/fgtsSimulationAutomation/Campaigns/create')));
const ListInstance = Loadable(lazy(() => import('views/tools/fgtsSimulationAutomation/Instance/list')));
const CreateInstance = Loadable(lazy(() => import('views/tools/fgtsSimulationAutomation/Instance/create')));

const CpfDataCollect = Loadable(lazy(() => import('views/integrations/DataCollect')));

const MainRoutes = {
  path: '/',
  element: <ProtectedRoute />,
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
      path: 'tools',
      children: [
        {
          path: 'fgts-simulation-automation/campaign-dashboard',
          element: <DashboardCampaigns />
        },
        {
          path: 'fgts-simulation-automation/campaigns-list',
          element: <ListCampaigns />
        },
        {
          path: 'fgts-simulation-automation/campaign-create',
          element: <CreateCampaigns />
        },
        {
          path: 'fgts-simulation-automation/instance-list',
          element: <ListInstance />
        },
        {
          path: 'fgts-simulation-automation/instance-create',
          element: <CreateInstance />
        }
      ]
    },

    // Tools - DataCollect:

    {
      path: 'integrations',
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
