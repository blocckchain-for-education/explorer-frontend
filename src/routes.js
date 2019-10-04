import React from 'react';
import Batch from './views/Batches/Batch';


const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Transaction = React.lazy(() => import('./views/Transactions/Transaction'));
const AllTransactions = React.lazy(() => import('./views/Transactions/AllTransactions'));

const Block = React.lazy(() => import('./views/Blocks/Block'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/transactions/:id', exact: true, name: 'Transaction Details', component: Transaction },
  { path: '/transactions/', exact: true, name: 'Transaction Details', component: AllTransactions },

  { path: '/blocks/:id', exact: true, name: 'Block Details', component: Block },
  { path: '/batches/:id', exact: true, name: 'Batches Details', component: Batch },


];

export default routes;
