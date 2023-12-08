import React from 'react'

import Login from '../Login'
import Menu from '../Menu'
import { TokenContext } from '../../contexts/TokenProvider'

import styles from './App.module.css'
import { Outlet } from 'react-router-dom'

export default function App() {
  const { JWT } = React.useContext(TokenContext)

  return (
    <main className={styles.main}>
      {JWT ? (
        <>
          <Menu />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </main>
  )
}
