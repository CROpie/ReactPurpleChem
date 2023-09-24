import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import { toast } from 'react-toastify'

function Logout({ children, ...delegated }) {
  const { JWT, setJWT } = React.useContext(TokenContext)

  function handleLogOut() {
    setJWT()
    window.localStorage.removeItem('access-token')
    toast.success('Logged out.')
  }

  return (
    <button {...delegated} onClick={handleLogOut}>
      {children}
    </button>
  )
}

export default Logout
