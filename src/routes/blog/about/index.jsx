import React from 'react'
import { Result, Button } from 'antd';

import './style.scss'

const About = (props) => {
  return (
    <div className="about">
      <Result
        status="warning"
        title="Sorry, This page has not been developed yet, please wait."
        extra={<Button type="primary" onClick={ () => props.history.push('/blog')}>Back Home</Button>}
      />
    </div>
  )
}

export default About