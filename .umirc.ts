import { defineConfig } from '@umijs/max';
export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {},
  locale: {
    default: 'zh-TW',
    baseSeparator: '-',
  },
  routes: [
    {
      path: '/',
      redirect: '/sdgs',
      layout: false,
    },
    {
      name: ' SDGs  ',
      path: '/sdgs',
      component: './SDGs',
      layout: false,
    },
    {
      name: ' SDGs SDGsBooks  ',
      path: '/sdgs/sdgsbooks',
      component: './SDGs/sdgsbooks',
      layout: false,
    },

    {
      name: ' SDGs SDGsBooks List ',
      path: '/sdgs/sdgsbookslist',
      component: './SDGs/sdgsbookslist',
      layout: false,
    },
    {
      name: ' SDGs SDGsAction EDIT  ',
      path: '/sdgsaction/edit',
      component: './SDGsAction/edit',
      layout: false,
    },
    {
      name: ' SDGs SDGsTalk EDIT  ',
      path: '/sdgstalk/edit',
      component: './SDGsTalk/edit',
      layout: false,
    },
    {
      name: ' SDGs SDGskeyword EDIT  ',
      path: '/sdgskeyword/edit',
      component: './SDGsKeyword/edit',
      layout: false,
    },
    {
      name: ' SDGs SDGskeyword Add  ',
      path: '/sdgskeyword/add',
      component: './SDGsKeyword/add',
      layout: false,
    },
    {
      name: ' SDGs SDGsAction  ',
      path: '/sdgs/sdgsaction',
      component: './SDGs/sdgsaction',
      layout: false,
    },
    {
      name: ' SDGs SDGsKeywd ',
      path: '/sdgs/sdgskeywd',
      component: './SDGs/sdgskeywd',
      layout: false,
    },
    {
      name: ' SDGs SDGsItem  ',
      path: '/sdgs/sdgstalk',
      component: './SDGs/sdgstalk',
      layout: false,
    },
    {
      name: ' SDGs fileupload  ',
      path: '/sdgs/fileupload',
      component: './SDGs/fileupload',
      layout: false,
    },
    {
      name: ' SDGs bagupload  ',
      path: '/sdgs/bagupload',
      component: './SDGs/bagupload',
      layout: false,
    },
    {
      name: ' SDGs import ',
      path: '/import',
      component: './Import',
      layout: false,
    },
    {
      name: ' RestaurantTable ',
      path: '/RestaurantTable',
      component: './RestaurantTable',
      layout: false,
    }
  ],
  npmClient: 'npm',
  base: '/HyLibMain/hylibsdgs/',
  publicPath: '/HyLibMain/hylibsdgs/',
});

