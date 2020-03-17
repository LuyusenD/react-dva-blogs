import dva from 'dva';
import './index.css';
import { createBrowserHistory as createHistory } from 'history'

// 声明 dva实例, history 配置去除 /#/
const app = dva({
  history: createHistory()
});

// plugins
// app.use({});

// require model/index
require('./models')
  .default
  .forEach(file =>
    app.model(file.default)
  )
// app.model(require('./models/example').default);

app.router(require('./router').default);

// start 挂载
app.start('#root');
