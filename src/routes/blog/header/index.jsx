import React from 'react'
import { Avatar } from 'antd';
import './style.scss'

const Header = () => {
  return (
    <div className="header">
      <img className="bgimg" src="/public/images/blog-bg.jpg" />
      <div className="bgcolor" style={{backgroundColor: '#299982'}}></div>
      <div className="content">
        <Avatar size={150} className="content-image" src="/public/images/blog-portrait.jpg" />
        <p className="content-name">クレヨンしんちゃん</p>
        <p className="content-alias">あなたの釣りに従って法を執行します。 <br/>結局私は来るものは拒まないです。</p>
        {/* 随你钓鱼执法 毕竟我都来者不拒 */}
      </div>
    </div>
  )
}

export default Header