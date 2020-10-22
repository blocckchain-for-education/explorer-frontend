import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard/Dashboard'));
const Transaction = React.lazy(() => import('./views/Transactions/Transaction'));
const AllTransactions = React.lazy(() => import('./views/Transactions/AllTransactions'));

const Block = React.lazy(() => import('./views/Blocks/Block'));
const AllBlocks = React.lazy(() => import('./views/Blocks/AllBlocks'));


// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/transactions/:id', exact: true, name: 'Transaction Details', component: Transaction },
  { path: '/transactions/', exact: true, name: 'All Transaction', component: AllTransactions },
  { path: '/blocks/:id', exact: true, name: 'Block Details', component: Block },
  { path: '/blocks/', exact: true, name: 'All Block', component: AllBlocks },


];

export default routes;
