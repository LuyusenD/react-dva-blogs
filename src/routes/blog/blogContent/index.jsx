import React, { useState, useEffect, Fragment } from 'react'
import { connect } from 'dva'
import { Card, message } from 'antd'

import * as api from '@/services'
import { updateTopButton } from '@/actions'
import './style.scss'

const BlogCentent = (props) => {
  const [asyncLoadApiState, setAsyncLoadApiState] = useState(false)
  const [isAsyncApi, setIsAsyncApi] = useState(false)
  const [page, setPage] = useState(1)
  const [blogs, setBlogs] = useState([])

  const pageSize = 10
  const { Meta } = Card
  const { globalState, dispatch } = props

  useEffect(() => {
    // 网络请求blogs列表
    getBlogs({ page, pageSize })

  }, [])

  useEffect(() => {
    window.onscroll = (e) => {
      // 判断滚动条是否 滚到距离底部小于10px 则更新参数
      if (!asyncLoadApiState && !isAsyncApi && document.body.offsetHeight - (document.documentElement.scrollTop + document.documentElement.clientHeight) < 100) {
        setAsyncLoadApiState(true)
        setIsAsyncApi(true)
      }
      
      // 如果滚动高度大于379 并且 显示top按钮为false , 滚动条高度小于 379 并且按钮为 true 则会调用方法
      if (document.documentElement.scrollTop > 379 && !globalState.isShowTop )
        dispatch(updateTopButton( true )) 
      else if (document.documentElement.scrollTop < 379 && globalState.isShowTop )
        dispatch(updateTopButton( false )) 

    }
    // 网络请求blogs列表
    if (asyncLoadApiState && isAsyncApi) {
      setAsyncLoadApiState(false)
      // 携带回调参数 响应数据 自调回调
      getBlogs({
        page: page + 1, pageSize, callback: () => {
          setIsAsyncApi(false)
        }
      })
      setPage(page + 1)
    }
    return () => window.onscroll = null
  }, [asyncLoadApiState, isAsyncApi, page, globalState.isShowTop])

  const getBlogs = async (params) => {
    // 网络请求blogs
    let response = await api.getBlogs(params)
    setBlogs(blogs.concat(response.data.blogs))
  }

  const tabChangeHandler = (key) => {
    message.info('暂未开启');
    console.log(key)
  }
  return (
    <div className="blog-home">
      {
        blogs.map((item, index) => {
          return <Fragment key={index}>
            <Card title={item.title} className="blog-home-card" hoverable bordered={false} style={{ width: '100%' }} onClick={() => tabChangeHandler(item)} >
              <div className="card-my-span" dangerouslySetInnerHTML={{ __html: item.context }}></div>
              <Meta description={`作者: ${item.author}`} />
              <Meta description={`发布日期: ${item.time} -- 浏览数: ${item.browse}`} />
            </Card>
          </Fragment>
        })
      }
      <Card title='loadding...' style={{ width: '100%' }} loading={true} ></Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    globalState: state.globalState
  }
}

export default connect(mapStateToProps)(BlogCentent)