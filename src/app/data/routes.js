import items from '../components/serviceSection/ServiceItems.jsx';

const routes = [
  {
    path: '/service/web',
    component: items.ServiceWeb,
  },
  {
    path: '/service/graphic',
    component: items.ServiceGraphic,
  },
  {
    path: '/service/support',
    component: items.ServiceSupport,
  },
  {
    path: '/service/app',
    component: items.ServiceApp,
  },
  {
    path: '/service/marketing',
    component: items.ServiceMarketing,
  },
  {
    path: '/service/seo',
    component: items.ServiceSeo,
  },

]
export default routes;
