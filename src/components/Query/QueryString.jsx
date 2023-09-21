import React from 'react'

export default function QueryString({ queryDatabase, status }) {
  const [querystring, setQuerystring] = React.useState('')
  const isLoading = status === 'loading'

  async function handleSubmit(e) {
    e.preventDefault()
    queryDatabase('string', querystring)
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="querystring">
        <input
          id="querystring"
          value={querystring}
          onChange={(e) => setQuerystring(e.target.value)}
        />
      </label>
      <button disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</button>
    </form>
  )
}
