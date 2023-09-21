import React from 'react'

import OrderCAS from './OrderCAS'
import OrderForm from './OrderForm'
import { toast } from 'react-toastify'
import { TokenContext } from '../../contexts/TokenProvider'

const CASURL = `https://commonchemistry.cas.org/api/detail`
const DataURL = 'http://170.64.192.236:85'

function Order() {
  const [newChemical, setNewChemical] = React.useState({})
  const [newOrder, setNewOrder] = React.useState({})
  const [suppliers, setSuppliers] = React.useState([])
  const [status, setStatus] = React.useState('idle')
  const { JWT } = React.useContext(TokenContext)

  console.log(newChemical, newOrder)

  async function loadSuppliers() {
    console.log('Fetching Data...')
    setStatus('loading')
    const response = await fetch(`${DataURL}/supplierslist`, {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    })
    if (!response.ok) {
      toast.error(`Error (${response.statusText})`)
      setStatus('error')
      return
    }
    const json = await response.json()
    setStatus('success')
    setSuppliers(json)
  }

  React.useEffect(() => {
    loadSuppliers()
  }, [])

  async function searchCas(cas) {
    const response = await fetch(`${CASURL}?cas_rn=${cas}`)
    if (!response.ok) {
      toast.error(`Error (${response.statusText}`)
    }
    const json = await response.json()
    console.log(json)

    const phys = json.experimentalProperties.reduce((acc, item) => {
      const propName = item.name.replace(/ /g, '')
      const propValue = item.property
      acc[propName] = propValue

      return acc
    }, {})
    console.log(phys)

    const newChemicalCopy = {
      ...newChemical,
      CAS: json.rn,
      chemicalName: json.name,
      MW: json.molecularMass,
      inchi: json.inchi,
      smile: json.smile,
      MP: phys.MeltingPoint !== undefined ? phys.MeltingPoint : null,
      BP: phys.BoilingPoint !== undefined ? phys.BoilingPoint : null,
      density: phys.Density !== undefined ? phys.Density : null,
    }

    setNewChemical(newChemicalCopy)
  }

  async function placeOrder(amount, amountUnit, supplier_id) {
    console.log(amount, amountUnit, supplier_id)
    const newOrderCopy = { ...newOrder, amount, amountUnit, supplier_id }
    setNewOrder(newOrderCopy)

    const response = await fetch(`${DataURL}/order`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      body: JSON.stringify({ chemicalData: newChemical, orderData: newOrderCopy }),
    })
    if (!response.ok) {
      toast.error(`Error (${response.statusText}`)
    }
    const json = await response.json()
    toast.success('Order Placed.')
  }

  return (
    <section style={{ marginTop: '2rem' }}>
      <h4>Order</h4>
      <OrderCAS searchCas={searchCas} />
      <OrderForm placeOrder={placeOrder} suppliers={suppliers} />
    </section>
  )
}

export default Order

/*


  */
