export default {
  namespace: 'globalState',

  state: {
    // 主颜色
    mainColor: '#299982'
  },

  reducers: {
    setMainColor (state, actions) {
      return {
        mainColor: actions.payload
      }
    }
  }
}
