import React from 'react';
import { Router, Route, Switch } from 'dva/router';

import IndexPage from './routes/dva_welcome/IndexPage';
import Home from './routes/home';
import Blog from './routes/blog';

// 加载window-view-prot 数据到context 使组件中 useViewport 可获得浏览器宽高
import { ViewportProvider } from '@/utils/useViewport'


function RouterConfig({ history }) {
  return (
    <ViewportProvider>
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/welcome" component={IndexPage} />
          <Route path="/blog" component={Blog} />
        </Switch>
      </Router>
    </ViewportProvider>
  );
}

export default RouterConfig;
