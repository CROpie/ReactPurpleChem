import React from 'react'
import { toast } from 'react-toastify'

import { TokenContext } from '../../contexts/TokenProvider'

import LocationSidebar from './LocationSidebar'
import OrdersAccordion from './OrdersAccordion'

const DataURL = 'http://170.64.192.236:85'

function Inventory() {
  const [locations, setLocations] = React.useState([])
  const [orders, setOrders] = React.useState([])
  const [status, setStatus] = React.useState('idle')
  const [refreshKey, setRefreshKey] = React.useState(0)
  const [selectedLocation, setSelectedLocation] = React.useState('all')
  console.log(selectedLocation)
  const { JWT } = React.useContext(TokenContext)

  async function loadOrders() {
    console.log('Fetching Data...')
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
    setLocations(json.locationsList)
    setOrders(json.ordersList)
  }

  React.useEffect(() => {
    loadOrders()
  }, [refreshKey])

  async function addNewLocation(newLocation) {
    // setStatus('loading')

    const response = await fetch(`${DataURL}/location`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      body: JSON.stringify({ locationName: newLocation }),
    })
    if (!response.ok) {
      toast.error(`Failed to add location: (${response.statusText})`)
      // setStatus('error')
      return
    }
    const json = await response.json()
    const newRefreshKey = refreshKey + 1
    setRefreshKey(newRefreshKey)
  }

  async function patchInventory(patchInventoryItem) {
    // setStatus('loading')

    const response = await fetch(`${DataURL}/inventory`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      body: JSON.stringify(patchInventoryItem),
    })
    if (!response.ok) {
      toast.error(`Failed to make changes: (${response.statusText})`)
      // setStatus('error')
      return
    }
    const json = await response.json()
    const newRefreshKey = refreshKey + 1
    setRefreshKey(newRefreshKey)
  }

  return (
    <section style={{ marginTop: '2rem' }}>
      <h4>Inventory</h4>
      <LocationSidebar
        locations={locations}
        addNewLocation={addNewLocation}
        setSelectedLocation={setSelectedLocation}
      />
      <OrdersAccordion
        orders={orders}
        selectedLocation={selectedLocation}
        patchInventory={patchInventory}
        locations={locations}
      />
    </section>
  )
}

export default Inventory
