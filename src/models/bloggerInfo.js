import * as api from '../services/example'

export default {
  namespace: 'bloggerInfo',

  state: {
    imgUrl: null,
    name: null,
    autograph: null
  },

  effects: {
    *getBloggerInfoAsync( state , { call, put }) {
      const response = yield call(api.getBloggerInfo);
      localStorage.bloggerInfo = JSON.stringify(response.data)
      yield put({
        type: 'save',
        data: response.data
      })
    },
  },

  reducers: {
    save (state, actions) {
      return actions.data
    }
  }
}
