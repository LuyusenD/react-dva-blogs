import React, { useState, useEffect, useViewport } from 'react'
import { Switch } from 'dva/router'
import { connect } from 'dva'
import { TwitterPicker } from 'react-color'

import './style.scss'
import { mapRouter } from '@/utils/global.js'
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

  const onChangeMainColor = ({hex}) => {
    //监听color选择器 变化
    dispatch(updateMainColor(hex))
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
        <TwitterPicker className="seart-color-item" triangle='hide' color={ globalState.mainColor } onChange={ onChangeMainColor } />
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