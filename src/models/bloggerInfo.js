import * as api from '../services'

const localBloggerInfo = localStorage.bloggerInfo ? JSON.parse(localStorage.bloggerInfo) : false
console.log(localBloggerInfo)

let initiarValue = {
  imgUrl: null,
  name: null,
  autograph: null
}

if (localBloggerInfo) {
  let { imgUrl, name, autograph } = localBloggerInfo
  initiarValue = {imgUrl, name, autograph}
}

export default {
  namespace: 'bloggerInfo',

  state: initiarValue,

  effects: {
    *getBloggerInfoAsync(state, { call, put }) {
      const response = yield call(api.getBloggerInfo);
      localStorage.bloggerInfo = JSON.stringify(response.data)
      yield put({
        type: 'save',
        data: response.data
      })
    },
  },

  reducers: {
    save(state, actions) {
      return actions.data
    }
  }
}
