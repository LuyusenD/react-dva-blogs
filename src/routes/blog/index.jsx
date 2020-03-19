import React, { useState, useEffect } from 'react'
import { Switch } from 'dva/router'

import './style.scss'
import { mapRouter } from '@/utils/global.js'

import Header from './header'
import BlogContent from './blogContent'
import About from './about'
import Copywriting from './about'
import BlogClasstions from './about'

const Blog = (props) => {

  const [routers] = useState([{ BlogContent }, { About }, { Copywriting }, { BlogClasstions }])
  const [minHeight, setmMinHeight] = useState('auto')
  const [routeNotOpened, setRouteNotOpened] = useState(null)
  const [notOpenModel] = useState(['/about', '/copywriting', '/blogclasstions'])

  useEffect(() => {
    // 监听路由 是否 已开发, 做 style 控制
    props.history.listen((history) => {
      console.log(history);
      let parent = history.pathname.slice(0, 5)
      let child = history.pathname.slice(5)
      if (parent === '/blog')
        if (notOpenModel.indexOf(child) !== -1)
          setRouteNotOpened(true)
        else
          setRouteNotOpened(false)
    })

    // 监听window高度,  设置最小值 
    setmMinHeight(`${window.innerHeight}px`)
    window.onresize = () => {
      setmMinHeight(`${window.innerHeight}px`)
    }
    // 离开页面 触发函数 onresize复原
    return () => window.onresize = null
  }, [])

  return (
    <div className="blog-max-box" style={{ minHeight }}>
      {/* className={styles.blog} */}
      <Header history={props.history} />
      <div className="blog-content">
        <div className="content" style={{margin: routeNotOpened ? '0 auto' : ''}}>
          <Switch>
            {
              mapRouter({ routers, options: { parentPath: '/blog', notChildrenPathName: 'BlogContent' } })
            }
          </Switch>
        </div>
        <div className="content-sider" style={{display: routeNotOpened ? 'none' : 'block'}}>
          a
        </div>
      </div>
    </div>
  )
}

export default Blog