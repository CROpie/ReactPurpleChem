import React from 'react'

export default function QueryStructure({ queryDatabase, status }) {
  const [jsmeApplet, setJsmeApplet] = React.useState(null)
  const [RDKitMod, setRDKit] = React.useState(null)

  const isLoading = status === 'loading'

  const generateStructure = () => {
    const newSmile = jsmeApplet.smiles()
    if (!newSmile) return

    const inchi = RDKitMod.get_mol(newSmile).get_inchi()

    queryDatabase('structure', inchi)
  }

  React.useEffect(() => {
    const newJsmeApplet = new JSApplet.JSME('jsme_container', '380px', '340px')
    setJsmeApplet(newJsmeApplet)

    // async is necessary.
    async function initRDKit() {
      const initRDKitMod = await initRDKitModule()
      setRDKit(initRDKitMod)
    }
    initRDKit()
  }, [])

  return (
    <section>
      <div id="jsme_container" />
      <button onClick={generateStructure} disabled={isLoading}>
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </section>
  )
}
