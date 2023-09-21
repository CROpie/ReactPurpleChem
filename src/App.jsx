import React from 'react'

import styled from 'styled-components'
import Login from './components/Login'
import Menu from './components/Menu'
import { TokenContext } from './contexts/TokenProvider'
import Logout from './components/Logout/Logout'

export default function App() {
  const { JWT } = React.useContext(TokenContext)

  return (
    <main style={{ margin: '2rem' }}>
      <h2>App</h2>
      {JWT ? <Menu /> : <Login />}
      <Logout />
    </main>
  )
}
