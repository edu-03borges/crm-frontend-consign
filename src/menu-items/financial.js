import { AttachMoney } from '@mui/icons-material';

const icons = { AttachMoney };

const financial = {
  id: 'financial',
  title: 'Financeiro',
  caption: 'Portal de Finanças',
  type: 'group',
  children: [
    {
      id: 'fgts',
      title: 'FGTS',
      type: 'collapse',
      icon: icons.AttachMoney,
      children: [
        {
          id: 'campaign-dashboard',
          title: 'Dashboard',
          type: 'item',
          url: '/financial/campaign-dashboard',
          breadcrumbs: false
        },
        {
          id: 'campaign-create',
          title: 'Nova Campanha',
          type: 'item',
          url: '/financial/campaign-create',
          breadcrumbs: false
        },
        {
          id: 'campaigns-list',
          title: 'Ver Campanhas',
          type: 'item',
          url: '/financial/campaigns-list',
          breadcrumbs: false
        },
        {
          id: 'instance-create',
          title: 'Criar Instância',
          type: 'item',
          url: '/financial/instance-create',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default financial;
