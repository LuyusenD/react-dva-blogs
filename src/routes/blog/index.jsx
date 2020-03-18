import React, {useState} from 'react'
import { Switch } from 'dva/router'

import './style.scss'
import { mapRouter } from '@/utils/global.js'
import Header from './header'

import About from './about'
import Copywriting from './about'
import BlogClasstions from './about'
import BlogHome from './blogHome'

const Blog = () => {

  const [routers] = useState([{BlogHome},{About},{Copywriting},{BlogClasstions}])


  return (
    <div className="blog-max-box">
      {/* className={styles.blog} */}
      <Header />
      <div className="blog-content">
        <div className="content">
          <Switch>
            {
              mapRouter({routers, options: {parentPath: '/blog', notChildrenPathName: 'BlogHome'}})
            }
          </Switch>
        </div>
        <div className="content-sider">
          a
        </div>
      </div>
    </div>
  )
}

export default Blog