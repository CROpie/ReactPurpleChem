import React from 'react'
import { toast } from 'react-toastify'

import { TokenContext } from '../../contexts/TokenProvider'

import LocationSidebar from './LocationSidebar'
import OrdersAccordion from './OrdersAccordion'

import { DataURL } from '../constants'
import Heading from '../AAA/Heading'

function Inventory() {
  const [locations, setLocations] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [status, setStatus] = React.useState('idle')
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [selectedLocation, setSelectedLocation] = React.useState({ value: 'all', label: 'all' })

  const { JWT } = React.useContext(TokenContext)

  async function loadOrders() {
    setStatus('loading')
    const response = await fetch(`${DataURL}/inventory`, {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    })
    if (!response.ok) {
      toast.error(`Error (${response.statusText})`)
      setStatus('error')
      return
    }
    const json = await response.json()
    setStatus('success')

    const mapLocations = json.locationsList.map((location) => {
      const obj = { value: location.id, label: location.locationName }
      return obj
    })

    setLocations(mapLocations)
    setOrders(json.ordersList)
  }

  React.useEffect(() => {
    loadOrders()
  }, [refreshKey])

  return (
    <section style={{ marginTop: '2rem' }}>
      <Heading level={3}>Inventory</Heading>
      <main style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem' }}>
        <LocationSidebar
          locations={locations}
          setSelectedLocation={setSelectedLocation}
          setRefreshKey={setRefreshKey}
        />
        <OrdersAccordion
          orders={orders}
          selectedLocation={selectedLocation}
          setRefreshKey={setRefreshKey}
          locations={locations}
        />
      </main>
    </section>
  )
}

export default Inventory
