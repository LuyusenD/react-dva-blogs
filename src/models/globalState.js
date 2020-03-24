//读取缓存颜色
const mainColor = localStorage.mainColor ? localStorage.mainColor : '#299982'

export default {
  namespace: 'globalState',


  state: {
    // 主颜色
    mainColor,
    isShowTop: false
  },

  reducers: {
    setMainColor (state, actions) {
      localStorage.mainColor = actions.payload
      return {
        ...state,
        mainColor: actions.payload
      }
    },
    setIsShowTop (state, actions) {
      return {
        ...state,
        isShowTop: actions.payload
      }
    }
  }
}
