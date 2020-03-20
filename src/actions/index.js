// 集成 actions 所有操作, 便于维护

import { createAction } from 'redux-actions'

// example | 例子
export const Login = createAction('user/login')

// 获取博主信息
export const getBloggerInfo = createAction('bloggerInfo/getBloggerInfoAsync')
// 获取博客文章
export const getBlogs = createAction('blogs/getBlogsListAsync')
// 改变主颜色
export const updateMainColor = createAction('globalState/setMainColor')