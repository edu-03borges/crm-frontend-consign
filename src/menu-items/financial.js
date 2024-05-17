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
          id: 'fgts-simulation',
          title: 'Simulação',
          type: 'item',
          url: '/financial/fgts-simulation',
          breadcrumbs: false
        },
        {
          id: 'criar-campanhas',
          title: 'Nova Campanhas',
          type: 'item',
          url: '/financial/campaign-create',
          breadcrumbs: false
        },
        {
          id: 'listar-campanhas',
          title: 'Ver Campanhas',
          type: 'item',
          url: '/financial/campaigns-list',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default financial;
