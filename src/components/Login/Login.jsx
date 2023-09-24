import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import LoginForm from './LoginForm'
import Heading from '../AAA/Heading'
import { toast } from 'react-toastify'

import { AuthURL } from '../constants'

function Login() {
  const { JWT, setJWT } = React.useContext(TokenContext)

  async function logIn({ username, password }) {
    // make fetch call
    const response = await fetch(AuthURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ username, password }),
    })
    if (!response.ok) {
      toast.error(`Error logging in...(${response.statusText})`)
      return
    }
    const json = await response.json()
    // access_token, refresh_token, role, token_type: "bearer"
    toast.success('Logged in!')

    // if successful, set JWT
    setJWT(json.access_token)
  }

  return (
    <section style={{ marginTop: '1rem' }}>
      {/* <Heading level={3}>Log In Page</Heading> */}
      <LoginForm logIn={logIn} />
    </section>
  )
}

export default Login
