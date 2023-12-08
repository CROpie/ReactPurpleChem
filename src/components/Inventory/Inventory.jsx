import React from 'react'
import { toast } from 'react-toastify'

import { TokenContext } from '../../contexts/TokenProvider'

import LocationSidebar from './LocationSidebar'
import OrdersAccordion from './OrdersAccordion'

import { DataURL } from '../constants'
import Heading from '../AAA/Heading'
import { useQuery } from '@tanstack/react-query'

function inventoryQuery() {
  return { queryKey: ['inventory'], queryFn: getInventoryData, staleTime: 1000 * 60 * 5 }
}

async function getInventoryData() {
  const JWT = window.localStorage.getItem('access-token')

  const response = await fetch(`${DataURL}/inventory`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }
  const json = await response.json()

  return json
}

export const inventoryLoader = (queryClient) => async () => {
  console.log('inside loader')
  const query = inventoryQuery()
  const data = queryClient.getQueryData(query.queryKey) ?? (await queryClient.fetchQuery(query))

  return data
}

function Inventory() {
  // const [status, setStatus] = React.useState('idle')
  const [selectedLocation, setSelectedLocation] = React.useState({ value: 'all', label: 'all' })

  const { JWT } = React.useContext(TokenContext)

  const query = inventoryQuery()
  const { data } = useQuery(query)
  const { locationsList: locations, ordersList: orders } = data

  return (
    <section style={{ marginTop: '2rem' }}>
      <Heading level={3}>Inventory</Heading>
      <main style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '4rem' }}>
        <LocationSidebar locations={locations} setSelectedLocation={setSelectedLocation} />
        <OrdersAccordion
          orders={orders}
          selectedLocation={selectedLocation}
          locations={locations}
        />
      </main>
    </section>
  )
}

export default Inventory
