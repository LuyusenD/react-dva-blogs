import React from 'react'

import {keys} from './global'
// 获取window宽高函数
import { useViewport } from './useViewport'

(() => {
  //方法挂载集成
  let extend = [{useViewport}]

  extend.forEach(item => {
    // 添加依赖到React
    React[keys(item)] = item[keys(item)]
  })
})()
