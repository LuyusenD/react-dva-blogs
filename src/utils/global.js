import React from 'react'
import { Route } from 'dva/router'

export function keys(any, isLowerCase) {
  /**
   * 用于遍历路由 简洁方法
   * 传入对象 返回key值 可提供转换小写
   * 
   * params
   * any: Object|String
   * isLowerCase: Boolean
   * 
   * return String
   * 
   * any: {key: value} or ''
   */
  if (typeof (any) === 'string')
    return isLowerCase ? any.toLowerCase() : any
  return isLowerCase ? Object.keys(any)[0].toLowerCase() : Object.keys(any)[0]
}

export function mapRouter({ routers = null, options = {} }) {
  /**
   * params
   * routers:Array 
   * options:Object
   * callback:Function
   * 
   * return null
   * 
   * options: {
   *    parentPath: '', 
   *    notParent: ''
   * }
   * 
   * options.parentPath： 在需要配置父级路由路径 则可填写
   * options.notChildrenPathName 在同一渲染下,不需要配置父级路由路径 且 其他路由需要配置父级路径  则可填写
   * 
   * routers:[{About},{Home}]
   * ps:用于遍历路由渲染
   */

  // 必传字段判断
  if (!routers) return new Error('Funtion mapRouter Missing parameters, Necessary params: routers')

  // 判断是否存在父组件路径
  const { parentPath, notChildrenPathName } = options
  const path = parentPath ? parentPath.slice(0, 1) !== '/' ? `/${parentPath}` : parentPath : ''

  // 遍历routers渲染Route
  let block = (
    <React.Fragment>
      {
        routers.map((el, index) => {
          return <Route key={index} exact component={el[keys(el)]} path={`${path}${keys(notChildrenPathName, true) !== keys(el, true) ? '/' + keys(el, true) : ''}`}></Route>
        })
      }
    </React.Fragment>
  )

  // 抛出渲染后的组件
  return block

}

export function reCallTopFun () {
  document.documentElement.scrollTop = 0
  // let time = setInterval(() => {
  //   document.documentElement.scrollTop -= 30
  //   if (document.documentElement.scrollTop <= 0) {
  //     clearInterval(time)
  //     time = null
  //   }
  // }, 1)
  
}