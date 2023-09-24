import React from 'react'

export const RDKitContext = React.createContext()

function RDKitProvider({ children }) {
  const [RDKit, setRDKit] = React.useState(null)

  React.useEffect(() => {
    // async is necessary.
    async function initRDKit() {
      const initRDKitMod = await initRDKitModule()
      setRDKit(initRDKitMod)
    }
    initRDKit()
  }, [])

  return <RDKitContext.Provider value={{ RDKit }}>{children}</RDKitContext.Provider>
}

export default RDKitProvider
