/**
 * 使用 require.context 获取目录文件
 * 过滤 index.js 文件 
 * 通过遍历 export models
 * 
 * 目的: 不用频繁引入model文件 使用直接创建文件 自动载入 
 */

const context = require.context('./', false, /\.js$/)

export default context
  .keys()
  .filter(key => key != './index.js')
  .map(key => context(key))

