import { AutoGraph } from '@mui/icons-material';

const icons = { AutoGraph };

const integrations = {
  id: 'integrations',
  title: 'Integrações',
  // caption: '',
  type: 'group',
  children: [
    {
      id: 'dataCollect',
      title: 'Higienização',
      type: 'collapse',
      icon: icons.AutoGraph,
      children: [
        {
          id: 'cpf-data-collect',
          title: 'por CPF',
          type: 'item',
          url: '/integrations/cpf-data-collect',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default integrations;
