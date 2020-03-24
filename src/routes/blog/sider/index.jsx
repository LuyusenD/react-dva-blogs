import React, { useState, useEffect } from 'react'
import { connect } from 'dva'
import { Card, Input, List, Typography } from 'antd'
import * as api from '@/services'
import './style.scss'

const { Search } = Input

const Sider = (props) => {
  const [tabs] = useState(['最新文章', '随机语录', '操作记录'])
  const [activeIndex, setActiveIndex] = useState(0)
  const [newBlogs, setNewBlogs] = useState([])
  const [copywriting, setCopywriting] = useState([])

  const { globalState } = props
  const { mainColor } = globalState


  useEffect(() => {
    //判断 tabs选择的 是否有数据 只允许请求一次
    if ([newBlogs, copywriting, [{}]][activeIndex].length === 0)
      [getNewBlogs, getCopywriting][activeIndex]()
      
  }, [activeIndex])
  // 声明获取newblogs copywriting数据
  const getNewBlogs = async () => {
    let response = await api.getNewBlogs()
    setNewBlogs(response.data.blogs)
  }
  const getCopywriting = async () => {
    let response = await api.getNewBlogs()
    setCopywriting(response.data.blogs)
  }

  // tabs切换回调函数
  const tabsChangeCallback = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className="sider">
      <Card style={{ width: '100%' }}>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: '100%', borderColor: mainColor, boxShadow: '0 0 0 0' }}
        />
      </Card>
      <div className="tab-box">
        <div className="table-cont">
          <div className="cont-header">
            <ul>
              {
                tabs.map((item, index) => {
                  return <li key={index} style={{ color: activeIndex === index ? mainColor : '' }} onClick={() => { tabsChangeCallback(index) }}>{item}</li>
                })
              }
            </ul>
            <i className="active-line" style={{ background: mainColor, left: `${activeIndex * (60 + 10)}px` }}></i>
          </div>
          <div className="cont-body">
            <List
              dataSource={[newBlogs, copywriting, []][activeIndex]}
              size="small"
              renderItem={item => (
                <List.Item onClick={() => console.log(item)} style={{ cursor: 'pointer' }}>
                  {/* <Typography.Text mark>[ITEM]</Typography.Text> */}
                  {item.title}
                </List.Item>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    globalState: state.globalState
  }
}

export default connect(mapStateToProps)(Sider)