import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Home from '../pages/Home';
import { Recovery } from '../pages/Recovery';
import { Create } from '../pages/Create';

const RoutesComponent: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" component={Home} isPrivate />
    <Route path="/recovery" component={Recovery} />
    <Route path="/create" component={Create} />
  </Switch>
);

export default RoutesComponent;
