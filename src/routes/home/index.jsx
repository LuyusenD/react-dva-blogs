import React, { useState } from 'react'
import { Link } from 'dva/router'
import { Row, Col } from 'antd'

// import styles from './style.scss'

const Home = () => {
  return (
    <div > 
      {/* className={styles.home} */}
      <Link to="/blog">Will Blog</Link>
    </div>
  )
}

export default Home