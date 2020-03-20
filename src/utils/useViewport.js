import React, { useState, useEffect, createContext, useContext } from 'react'

/**
 * hooks + context
 * 利用context全局挂载window宽高度 使组建中共用同一参数
 * 
 * <ViewportProvider>
 *  <App />
 * </ViewportProvider>
 * 
 * 挂载在App
 * 任意子组件调用 React.useViewport() 则可获得参数
 */
const ViewPortContext = createContext({})


const ViewportProvider = ({ children }) => {
  //声明宽高度
  const [width, setWidth] = useState(window.innerWidth)
  const [height, setHeight] = useState(window.innerHeight)

  const handlerWindowPort = () => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
  }

  useEffect(() => {
    //挂载到window事件,并做摧毁清除操作
    window.addEventListener("resize", handlerWindowPort)
    return () => window.removeEventListener("resize", handlerWindowPort)
  }, [])

  return (
    <ViewPortContext.Provider value={{ width, height }}>
      {children}
    </ViewPortContext.Provider>
  )
}

const useViewport = () => {
  //提供方法 方便获取参数
  return useContext(ViewPortContext)
}

export { ViewportProvider, useViewport }