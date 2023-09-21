import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import LoginForm from './LoginForm'

function Login() {
  const { JWT } = React.useContext(TokenContext)
  return (
    <section style={{ marginTop: '1rem' }}>
      <h3>Log In Page</h3>
      <LoginForm />
    </section>
  )
}

export default Login
