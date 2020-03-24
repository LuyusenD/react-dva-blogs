// 集成 actions 所有操作, 便于维护

import { createAction } from 'redux-actions'

// example | 例子
export const Login = createAction('user/login')

// 获取博主信息
export const getBloggerInfo = createAction('bloggerInfo/getBloggerInfoAsync')
// 改变主颜色
export const updateMainColor = createAction('globalState/setMainColor')
// 改变全局 是否显示返回置顶按钮
export const updateTopButton = createAction('globalState/setIsShowTop')