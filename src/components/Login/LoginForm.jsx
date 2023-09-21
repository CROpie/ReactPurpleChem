import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import { toast } from 'react-toastify'

const AuthURL = 'http://170.64.192.236:80/token'

function LoginForm() {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const { setJWT } = React.useContext(TokenContext)

  async function handleSubmit(e) {
    e.preventDefault()
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
      <h4>Log In Form</h4>
      <form style={{ marginTop: '0.5rem' }} onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          type="email"
          name="username"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Submit</button>
      </form>
    </section>
  )
}

export default LoginForm
