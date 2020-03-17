import fs from 'fs'
import path from 'path'

const mock = {};

// 通过fs模块  读取mock目录下所有js文件 挂载mock
fs.readdirSync(path.join(__dirname, '/mock')).forEach(file => {
  if (file.match(/\.js$/))
    Object.assign(mock, require(`./mock/${file}`))
})

export default mock

/**
 * {
 *  require('./mock/*.js')
 * }
 */