import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Home from '../pages/Home';
import { Recovery } from '../pages/Recovery';
import { Create } from '../pages/Create';

import Business from '../pages/Business';

import Page404 from '../pages/404';

const RoutesComponent: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/business" component={Business} isPrivate />
    <Route path="/recovery" component={Recovery} />
    <Route path="/create" component={Create} />
    <Route path="*" component={Page404} isPrivate />
  </Switch>
);

export default RoutesComponent;
