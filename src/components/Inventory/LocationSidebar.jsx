import React from 'react'

export default function LocationSidebar({ locations, addNewLocation, setSelectedLocation }) {
  const [newLocation, setNewLocation] = React.useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!newLocation) return
    addNewLocation(newLocation)
    setNewLocation('')
  }
  return (
    <section style={{ marginTop: '0.5rem' }}>
      <ul>
        <li key={'all'}>
          <button onClick={() => setSelectedLocation('all')}>All</button>
        </li>
        {locations.map(({ id, locationName }) => (
          <li key={id}>
            <button onClick={() => setSelectedLocation(id)}>{locationName}</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newLocation">
          New Location
          <input
            id="newLocation"
            value={newLocation}
            onChange={(e) => setNewLocation(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </section>
  )
}
