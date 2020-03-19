import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import { Card, message } from 'antd'

import { getBlogs } from '@/actions'
import './style.scss'

const BlogCentent = (props) => {
  const [asyncLoadApiState, setAsyncLoadApiState] = useState(false)
  const [isAsyncApi, setIsAsyncApi] = useState(false)
  const [page, setPage] = useState(1)

  const pageSize = 10

  const { dispatch } = props
  const { Meta } = Card


  useEffect(() => {
    // 网络请求blogs列表
    dispatch(getBlogs({ page, pageSize }))
  }, [])

  useEffect(() => {
    window.onscroll = (e) => {
      // 判断滚动条是否 滚到距离底部小于10px 则更新参数
      if (!asyncLoadApiState && !isAsyncApi && document.body.offsetHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight) < 100) {
        setAsyncLoadApiState(true)
        setIsAsyncApi(true)
      }
    }
    // 网络请求blogs列表
    if (asyncLoadApiState && isAsyncApi) {
      setAsyncLoadApiState(false)
      // 携带回调参数 响应数据 自调回调
      dispatch(getBlogs(
        { page: page + 1, pageSize, callback: () => {
          setIsAsyncApi(false)
        }},
      ))
      setPage(page + 1)
    }
  }, [asyncLoadApiState, isAsyncApi, page])

  const tabChangeHandler = (key) => {
    message.info('暂未开启');
    console.log(1, key)
  }
  return (
    <div className="blog-home">
      {
        props.blogs.length > 0
          ?
          props.blogs.map((item, index) => {
            return <Fragment key={index}>
              <Card title={item.title} className="blog-home-card" hoverable bordered={false} style={{ width: '100%' }} onClick={() => tabChangeHandler(item)} >
                <div className="card-my-span" dangerouslySetInnerHTML={{ __html: item.context }}></div>
                <Meta description={`作者: ${item.author}`} />
                <Meta description={`发布日期: ${item.time} -- 浏览数: ${item.browse}`} />
              </Card>
            </Fragment>
          })
          :
          <Card title='loadding...' style={{ width: '100%' }} loading={true} ></Card>
      }
      <Card title='loadding...' style={{ width: '100%' }} loading={true} ></Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return state.blogs
}

export default connect(mapStateToProps)(BlogCentent)