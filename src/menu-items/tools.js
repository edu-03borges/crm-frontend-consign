import { Android } from '@mui/icons-material';

const icons = { Android };

const tools = {
  id: 'tools',
  title: 'Ferramentas',
  caption: 'Portal de Ferramentas',
  type: 'group',
  children: [
    {
      id: 'fgts-simulation-automation',
      title: 'Automação FGTS',
      type: 'collapse',
      icon: icons.Android,
      children: [
        {
          id: 'campaign-dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/tools/fgts-simulation-automation/campaign-dashboard',
          breadcrumbs: false
        },
        {
          id: 'campaign-create',
          title: 'Nova Campanha',
          type: 'item',
          url: '/tools/fgts-simulation-automation/campaign-create',
          breadcrumbs: false
        },
        {
          id: 'campaigns-list',
          title: 'Ver Campanhas',
          type: 'item',
          url: '/tools/fgts-simulation-automation/campaigns-list',
          breadcrumbs: false
        },
        {
          id: 'instance-create',
          title: 'Criar Instância',
          type: 'item',
          url: '/tools/fgts-simulation-automation/instance-create',
          breadcrumbs: false
        },
        {
          id: 'instance-list',
          title: 'Ver Instâncias',
          type: 'item',
          url: '/tools/fgts-simulation-automation/instance-list',
          breadcrumbs: false
        },
      ]
    }
  ]
};

export default tools;
