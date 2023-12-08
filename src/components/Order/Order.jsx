import React from 'react'

import Heading from '../AAA/Heading'
import OrderCAS from './OrderCAS'
import OrderForm from './OrderForm'

import { toast } from 'react-toastify'
import { TokenContext } from '../../contexts/TokenProvider'

import { DataURL } from '../constants'
import { usePostOrder } from '../../mutations/usePostOrder'

function Order() {
  const [newChemical, setNewChemical] = React.useState({})
  const [status, setStatus] = React.useState('idle')
  const [extendedForm, setExtendedForm] = React.useState(false)

  const { JWT } = React.useContext(TokenContext)

  const casRef = React.useRef()

  const { mutate } = usePostOrder(JWT)

  // gets called from OrderForm
  // data contains ordering info, and if inputted manually, chemical info
  async function placeOrder(data) {
    //
    const orderData = {
      amount: data.amount,
      amountUnit: data.amountUnit,
      supplier_id: data.supplier,
    }

    let chemicalData = {}
    // if chemical data wasn't found by cas or database, get data via the from in ExtendedOrderForm
    if (extendedForm) {
      // determine CAS number via casRef
      const casNumberData = new FormData(casRef.current)
      const casNumber = casNumberData.get('cas')

      chemicalData = {
        CAS: String(casNumber),
        chemicalName: String(data.chemicalName),
        MW: String(data.MW),
        MP: String(data.MP),
        BP: String(data.BP),
        density: String(data.density),
        smile: String(data.smile),
        inchi: String(data.inchi),
      }
    } else {
      // otherwise, it will be stored in newChemical already
      chemicalData = newChemical
    }

    mutate({ chemicalData, orderData })
  }

  return (
    <main style={{ marginTop: '2rem' }}>
      <Heading level={3}>Order</Heading>
      <OrderCAS
        setNewChemical={setNewChemical}
        setExtendedForm={setExtendedForm}
        setStatus={setStatus}
        casRef={casRef}
      />
      {status === 'loading' && <p style={{ color: 'var(--text-color)' }}>Searching...</p>}
      {status === 'searched' && <OrderForm placeOrder={placeOrder} extendedForm={extendedForm} />}
    </main>
  )
}

export default Order
