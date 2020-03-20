import React, { useEffect } from 'react'
import { connect } from 'dva'
import { Card, Input } from 'antd'
const { Search } = Input

const Sider = (props) => {
  const { globalState } = props

  useEffect(() => {
    // dispatch(action.updateMainColor('red'))
    // dispatch(action.updateMainColor())
  }, [])

  return (
    <div className=".sider">
      <Card style={{ width: '100%' }}>
        <Search
          placeholder="input search text"
          onSearch={value => console.log(value)}
          style={{ width: '100%', borderColor: globalState.mainColor, boxShadow: '0 0 0 0' }}
        />
      </Card>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    globalState: state.globalState
  }
}

export default connect(mapStateToProps)(Sider)