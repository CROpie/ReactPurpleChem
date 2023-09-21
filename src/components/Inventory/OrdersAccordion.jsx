import React from 'react'

import * as Accordion from '@radix-ui/react-accordion'
import OrderProperties from './OrderProperties'
import OrderAdjust from './OrderAdjust'

export default function OrdersAccordion({ orders, selectedLocation, patchInventory, locations }) {
  const [RDKitMod, setRDKit] = React.useState(null)
  const [structure, setStructure] = React.useState('')

  if (selectedLocation !== 'all') {
    orders = orders.filter((order) => order.location_id === selectedLocation)
  }

  function handleClick(order) {
    const currentStructure = RDKitMod.get_mol(order.chemical.smile).get_svg()
    setStructure(currentStructure)
  }

  React.useEffect(() => {
    // async is necessary.
    async function initRDKit() {
      const initRDKitMod = await initRDKitModule()
      setRDKit(initRDKitMod)
    }
    initRDKit()
  }, [])

  return (
    <Accordion.Root type="single" collapsible style={{ marginTop: '3rem' }}>
      {orders.map((order) => (
        <Accordion.Item key={order.id} value={order.id} onClick={() => handleClick(order)}>
          <Accordion.Header>
            <Accordion.Trigger>
              {order.id}-{order.chemical.chemicalName}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content>
            <OrderAdjust order={order} patchInventory={patchInventory} locations={locations} />
            <OrderProperties order={order} structure={structure} />
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
/*
  <Accordion.Root>
    <Accordion.Item>
      <Accordion.Header>
        <Accordion.Trigger />
      </Accordion.Header>
      <Accordion.Content />
    </Accordion.Item>
  </Accordion.Root>
*/
/*
    "chemical_id": 21,
    "supplier_id": 1,
    "amount": 0,
    "amountUnit": "mL",
    "supplierPN": "319953",
    "id": 23,
    "user_id": 1,
    "user": {
        "id": 1,
        "username": "admin@purplechem.com",
        "full_name": "administrator"
    },
    "chemical": {
        "CAS": "71-43-2",
        "chemicalName": "Benzene",
        "MW": "78.11",
        "MP": "5.5 °C",
        "BP": "80.1 °C",
        "density": "0.8787 g/cm³ @ Temp: 15 °C",
        "smile": "C=1C=CC=CC1",
        "inchi": "InChI=1S/C6H6/c1-2-4-6-5-3-1/h1-6H",
        "id": 21
    },
    "supplier": {
        "supplierName": "Sigma-Aldrich",
        "id": 1
    },
    "location_id": 1,
    "location": {
        "locationName": "Solvent Cupboard",
        "id": 1
    },
    "status": "received",
    "isConsumed": true,
    "orderDate": "2023-08-27T11:23:56"
}
*/
