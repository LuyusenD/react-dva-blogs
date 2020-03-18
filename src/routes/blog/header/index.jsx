import React, { useState, useEffect } from 'react'
import { Link } from 'dva/router'
import { connect } from 'dva'
import { Avatar } from 'antd';
import { getBloggerInfo } from '@/actions'
import './style.scss'

const Header = (props) => {

  const { bloggerInfo, dispatch } = props

  const [navList] = useState([
    { name: '首页', path: '/blog' },
    { name: '分类', path: '/blog/blogclasstions' },
    { name: '语录/文案', path: '/blog/copywriting' },
    { name: '关于', path: '/blog/about' }
  ])

  useEffect(() => {
    dispatch(getBloggerInfo())
  }, [])
  console.log(props)
  return (
    <div className="header">
      <div className="header-cont">
        <img className="bgimg" src="/public/images/blog-bg.jpg" alt="backimage" />
        <div className="bgcolor" style={{ backgroundColor: '#299982' }}></div>
        <div className="content">
          <Avatar size={150} className="content-image" src={bloggerInfo.imgUrl} />
          <p className="content-name">{bloggerInfo.name}</p>
          <p className="content-alias">{bloggerInfo.autograph}</p>
          {/* 随你钓鱼执法 毕竟我都来者不拒 */}
        </div>
      </div>
      <div className="header-nav">
        <div className="nav">
          <ul>
            {
              navList.map((item, index) => <li key={index}><Link to={item.path} >{item.name}</Link></li>)
            }
          </ul>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    bloggerInfo: state.bloggerInfo
  }
}

export default connect(mapStateToProps)(Header)