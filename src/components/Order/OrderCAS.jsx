import React from 'react'

export default function OrderCAS({ searchCas }) {
  const [cas, setCas] = React.useState('110-54-3')

  function handleSubmit(e) {
    e.preventDefault()
    if (!cas) return
    searchCas(cas)
    setCas('110-54-3')
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cas">
        CAS number eg 110-54-3
        <input type="text" id="cas" value={cas} onChange={(e) => setCas(e.target.value)} />
      </label>
      <button>Search</button>
    </form>
  )
}
