import React from 'react'

import Login from '../Login'
import Menu from '../Menu'
import { TokenContext } from '../../contexts/TokenProvider'

import styles from './App.module.css'

export default function App() {
  const { JWT } = React.useContext(TokenContext)

  return <main className={styles.main}>{JWT ? <Menu /> : <Login />}</main>
}
