import dva from 'dva';
import './index.css';

// 引入React继承的方法
import './utils/reactExtend.js'

// import { createBrowserHistory as createHistory } from 'history'

// 声明 dva实例, history 配置去除 /#/
// dva({
//   history: createHistory()
// })
const app = dva();

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
