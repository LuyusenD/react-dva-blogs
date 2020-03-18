import React from 'react'
import { Card } from 'antd'

export default () => {
  return (
    <div className="blog-home">
      <Card title="Card title" bordered={false} style={{ width: '100%' }}>
        <span>.....文章内容</span>
      </Card>
      <Card title="Card title" bordered={false} style={{ margin: '10px 0',width: '100%' }}>
        <span>.....文章内容</span>
      </Card>
      <Card title="Card title" bordered={false} style={{ width: '100%' }}>
        <span>.....文章内容</span>
      </Card>
    </div>
  )
}