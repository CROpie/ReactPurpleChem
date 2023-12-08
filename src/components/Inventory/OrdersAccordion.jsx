import React from 'react'

import styles from './Inventory.module.css'

import * as Accordion from '@radix-ui/react-accordion'
import OrderProperties from './OrderProperties'
import OrderAdjust from './OrderAdjust'
import { RDKitContext } from '../../contexts/RDKitProvider'
import Heading from '../AAA/Heading'

export default function OrdersAccordion({ orders, selectedLocation, locations }) {
  console.log(orders, selectedLocation, locations)

  const [structure, setStructure] = React.useState('')

  const { RDKit } = React.useContext(RDKitContext)

  if (selectedLocation.id !== 'all') {
    orders = orders.filter((order) => order.location_id === selectedLocation.id)
  }

  function handleClick(order) {
    const currentStructure = RDKit.get_mol(order.chemical.smile).get_svg()
    setStructure(currentStructure)
  }

  return (
    <Accordion.Root type="single" collapsible style={{ marginTop: '0.5rem' }}>
      {/* <Heading level={3}>{selectedLocation.label}</Heading> */}
      {orders.map((order) => (
        <Accordion.Item key={order.id} value={order.id}>
          <Accordion.Header>
            <Accordion.Trigger className={styles.accordionItem} onClick={() => handleClick(order)}>
              {order.id}-{order.chemical.chemicalName}
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.accordionContentWrapper}>
            <div className={styles.accordionContent}>
              <OrderAdjust order={order} locations={locations} />
              <OrderProperties order={order} structure={structure} />
            </div>
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
