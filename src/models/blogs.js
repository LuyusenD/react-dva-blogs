import { getBlogs } from '../services'
export default {

  namespace: 'blogs',

  state: {
    blogs: []
  },

  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *getBlogsListAsync(state, { call, put }) {  // eslint-disable-line
      let response = yield call(getBlogs, state.payload)
      yield put({
        type: 'save',
        data: response.data
      })
    },
  },

  reducers: {
    save(state, action) {
      return {
        blogs: state.blogs.concat(action.data.blogs)
      }
    },
  },

};
