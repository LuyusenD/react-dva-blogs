import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/dva_welcome/IndexPage';
import Home from './routes/home';
import Blog from './routes/blog';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/welcome" component={IndexPage} />
        <Route path="/blog" component={Blog} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
