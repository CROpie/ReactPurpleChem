import React from 'react'
import UnCoInput from '../AAA/UnCoInput'
import UnCoSelect from '../AAA/UnCoSelect'
import ExtendedOrderForm from './ExtendedOrderForm'

import { toast } from 'react-toastify'

import { TokenContext } from '../../contexts/TokenProvider'

import { DataURL } from '../constants'
import Form from '../AAA/Form'
import Button from '../AAA/Button'

const amountUnitList = [
  { label: 'mg', value: 'mg' },
  { label: 'g', value: 'g' },
  { label: 'mL', value: 'mL' },
  { label: 'L', value: 'L' },
]

export default function OrderForm({ placeOrder, extendedForm }) {
  const [suppliers, setSuppliers] = React.useState([])

  const { JWT } = React.useContext(TokenContext)

  async function loadSuppliers() {
    const response = await fetch(`${DataURL}/supplierslist`, {
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    })
    if (!response.ok) {
      toast.error(`Error (${response.statusText})`)

      return
    }
    const json = await response.json()
    const mapSuppliers = json.map((supplier) => {
      const obj = { value: supplier.id, label: supplier.supplierName }
      return obj
    })

    setSuppliers(mapSuppliers)
  }

  React.useEffect(() => {
    loadSuppliers()
  }, [])

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    if (!data.amount || !data.amountUnit || !data.supplier) {
      toast.error('Please fill out the necessary fields..')
    }

    if (extendedForm && !data.chemicalName) {
      toast.error('Please enter name for the chemical.')
      return
    }
    if (extendedForm && !data.smile) {
      toast.error('Please draw and save the chemical in the field provided.')
      return
    }

    placeOrder(data)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <UnCoInput label="Amount:" type="number" name="amount" min="0" />
      <UnCoSelect list={amountUnitList} name="amountUnit" label="Unit:" />
      <UnCoSelect list={suppliers} name="supplier" label="Supplier:" />
      {extendedForm && <ExtendedOrderForm />}
      <Button>Submit</Button>
    </Form>
  )
}
