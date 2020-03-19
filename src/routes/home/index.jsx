import React, { useState } from 'react'
import { Link } from 'dva/router'
// import { Row, Col } from 'antd'

import './style.scss'

const Home = () => {
  const [count] = useState(0)
  return (
    <div > 
      {/* className={styles.home} */}
      <Link to="/blog">Will Blog</Link>: {count}
    </div>
  )
}

export default Home