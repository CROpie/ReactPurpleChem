import React from 'react'

export const TokenContext = React.createContext()

function TokenProvider({ children }) {
  // null or (?)
  const [JWT, setJWT] = React.useState(() => {
    const storedJWT = window.localStorage.getItem('access-token')
    // return JSON.parse(storedJWT) || null
    return storedJWT || null
  })

  React.useEffect(() => {
    window.localStorage.setItem('access-token', JWT)
  }, [JWT])

  return <TokenContext.Provider value={{ JWT, setJWT }}>{children}</TokenContext.Provider>
}

export default TokenProvider
