import React from 'react'

export const TokenContext = React.createContext()

function TokenProvider({ children }) {
  // null or (?)
  const [JWT, setJWT] = React.useState(() => {
    let storedJWT = window.localStorage.getItem('access-token')
    // storedJWT = JSON.parse(storedJWT)
    // return JSON.parse(storedJWT) || null
    // console.log('stored: ', storedJWT)
    // console.log('typeof: ', typeof storedJWT)
    return storedJWT || null
  })

  React.useEffect(() => {
    if (!JWT) {
      return
    }
    window.localStorage.setItem('access-token', JWT)
  }, [JWT])

  return <TokenContext.Provider value={{ JWT, setJWT }}>{children}</TokenContext.Provider>
}

export default TokenProvider
