import React, { useState, useEffect, useViewport } from 'react'
import { Switch } from 'dva/router'
import { connect } from 'dva'
import { TwitterPicker } from 'react-color'
import './style.scss'

import { mapRouter, reCallTopFun } from '@/utils/global.js'
import { updateMainColor } from '@/actions'

import Header from './header'
import BlogContent from './blogContent'
import About from './about'
import Copywriting from './about'
import BlogClasstions from './about'
import Sider from './sider'

const Blog = (props) => {

  const [routers] = useState([{ BlogContent }, { About }, { Copywriting }, { BlogClasstions }])
  const [minHeight, setmMinHeight] = useState('auto')
  const [routeNotOpened, setRouteNotOpened] = useState(null)
  const [notOpenModel] = useState(['/about', '/copywriting', '/blogclasstions'])
  const [path, setPath] = useState('/blog')
  // 获取页面高度
  const { height } = useViewport()
  const { history, globalState, dispatch } = props

  useEffect(() => {
    // 监听路由 是否 已开发, 做 style 控制
    history.listen((history) => {
      console.log(history);
      let parent = history.pathname.slice(0, 5)
      let child = history.pathname.slice(5)
      setPath(history.pathname)
      if (parent === '/blog')
        if (notOpenModel.indexOf(child) !== -1)
          setRouteNotOpened(true)
        else
          setRouteNotOpened(false)
    })
  }, [])

  useEffect(() => {
    // 设置最小高度 
    setmMinHeight(`${height}px`)
  }, [height])

  const onChangeMainColor = ({ hex }) => {
    //监听color选择器 变化
    dispatch(updateMainColor(hex))
  }

  const scorllChange = () => {
    //context 组件中配置滚动条事件 发生变化触发
    reCallTopFun()
    // dispatch(updateTopButton( false ))
  }
  return (
    <div className="blog-max-box" style={{ minHeight }}>
      {/* className={styles.blog} */}
      <Header history={history} pathname={path} />
      <div className="blog-content">
        <div className="content" style={{ margin: routeNotOpened ? '0 auto' : '' }}>
          <Switch>
            {
              mapRouter({ routers, options: { parentPath: '/blog', notChildrenPathName: 'BlogContent' } })
            }
          </Switch>
        </div>
        <div className="content-sider" style={{ display: routeNotOpened ? 'none' : 'block' }}>
          <Sider />
        </div>
      </div>
      <div className="blog-seart-color">
        <div className="seart-color-box">
          <div className="color-block"></div>
        </div>
        {/* colors={['red', 'green']} */}
        <TwitterPicker className="seart-color-item" triangle='hide' color={globalState.mainColor} onChange={onChangeMainColor} />
      </div>
      <div className="recall-top" onClick={ scorllChange } style={{display: globalState.isShowTop ? 'block' : 'none'}}>
        <svg id="point-up" version="1.1" >
          <path style={{fill: globalState.mainColor}} d="M23.588 17.637c-0.359-0.643-0.34-1.056-2.507-3.057 0.012-7.232-4.851-12.247-5.152-12.55 0-0.010 0-0.015 0-0.015s-0.003 0.003-0.007 0.007l-0.007-0.007c0 0 0 0.005 0 0.015-0.299 0.305-5.141 5.342-5.097 12.575-2.158 2.010-2.138 2.423-2.493 3.068-0.65 1.178-0.481 5.888 0.132 6.957 0.613 1.069 1.629 0.293 1.977-0.004 0.348-0.298 1.885-2.264 2.263-2.176 0 0 0.465-0.090 0.989 0.414 0.518 0.498 1.462 0.966 2.27 1.033 0 0.001 0 0.002-0 0.003 0.005-0.001 0.010-0.001 0.015-0.002 0.005 0 0.010 0.001 0.015 0.001 0-0.001-0-0.002 0-0.003 0.808-0.070 1.749-0.543 2.265-1.043 0.522-0.507 0.988-0.419 0.988-0.419 0.378-0.090 1.923 1.869 2.272 2.165 0.35 0.296 1.369 1.067 1.977-0.005 0.608-1.072 0.756-5.783 0.101-6.958v0 0zM15.95 14.86c-1.349 0.003-2.445-1.112-2.448-2.492-0.003-1.38 1.088-2.5 2.437-2.503 1.349-0.003 2.445 1.112 2.448 2.492 0.003 1.379-1.088 2.5-2.437 2.503v0 0zM17.76 24.876c-0.615 0.474-1.236 0.633-1.801 0.626-0.566 0.009-1.187-0.147-1.804-0.617-0.553-0.403-1.047-0.348-1.308 0.003-0.261 0.351-0.169 2.481 0.152 2.939 0.321 0.458 0.697-0.298 1.249-0.327 0.552-0.028 1.011 1.103 1.221 1.75 0.107 0.331 0.274 0.633 0.5 0.654 0.226-0.023 0.392-0.326 0.497-0.657 0.207-0.648 0.661-1.781 1.213-1.756 0.553 0.026 0.932 0.78 1.251 0.321 0.319-0.459 0.401-2.59 0.139-2.94-0.262-0.35-0.757-0.403-1.308 0.003v0 0z" fill="#CCCCCC"></path>
        </svg>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    globalState: state.globalState
  }
}

export default connect(mapStateToProps)(Blog)