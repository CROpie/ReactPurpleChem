import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import { toast } from 'react-toastify'

function Logout() {
  const { JWT, setJWT } = React.useContext(TokenContext)

  function handleLogOut() {
    setJWT(null)
    window.localStorage.removeItem('access-token')
    toast.success('Logged out.')
  }

  return (
    <>
      <button onClick={handleLogOut}>LogOut</button>
    </>
  )
}

export default Logout
