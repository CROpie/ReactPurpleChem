import React from 'react'
import NewLocation from './NewLocation'
import LocationsList from './LocationsList'
import Button from '../AAA/Button'

export default function LocationSidebar({ locations, setSelectedLocation, setRefreshKey }) {
  const [showNewLocation, setShowNewLocation] = React.useState(false)
  return (
    <section style={{ marginTop: '0.5rem' }}>
      <LocationsList locations={locations} setSelectedLocation={setSelectedLocation} />
      {showNewLocation && (
        <NewLocation setRefreshKey={setRefreshKey} setShowNewLocation={setShowNewLocation} />
      )}
      <Button type="button" onClick={() => setShowNewLocation(!showNewLocation)}>
        {showNewLocation ? 'Hide' : 'Add New Location'}
      </Button>
    </section>
  )
}
