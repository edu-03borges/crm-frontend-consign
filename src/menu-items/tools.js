import { AutoGraph } from '@mui/icons-material';

const icons = { AutoGraph };

const tools = {
  id: 'tools',
  title: 'Ferramentas',
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
          url: '/tools/cpf-data-collect',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default tools;
