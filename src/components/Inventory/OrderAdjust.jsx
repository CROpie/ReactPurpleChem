import React from 'react'

import { DataURL } from '../constants'

import { toast } from 'react-toastify'
import { TokenContext } from '../../contexts/TokenProvider'
import UnCoInput from '../AAA/UnCoInput'
import UnCoSelect from '../AAA/UnCoSelect'
import Button from '../AAA/Button'
import Form from '../AAA/Form'

import { usePatchOrder } from '../../mutations/usePatchOrder'

export default function OrderAdjust({ order, locations }) {
  const { amountUnit } = order

  const { JWT } = React.useContext(TokenContext)

  const { mutate } = usePatchOrder(JWT)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const amount = Number(formData.get('amount'))
    const location_id = Number(formData.get('location_id'))

    let isConsumed = false

    if (amount === 0) {
      isConsumed = true
    }
    const patchInventoryItem = {
      id: order.id,
      amount,
      isConsumed,
      location_id,
    }

    mutate({ patchInventoryItem })
  }

  // the way I made UnCoSelect, it requires list = [{value: str, label: str},]
  // so the keys of locations: [{id, location}] need to corrected
  const mapLocations = locations.map((location) => {
    return { value: location.id, label: location.locationName }
  })

  return (
    <Form onSubmit={handleSubmit} style={{ height: '100%', margin: '0' }}>
      <div style={{ display: 'flex', alignItems: 'end' }}>
        <UnCoInput
          label={`Amount Remaining: (${amountUnit})`}
          name="amount"
          type="number"
          min="0"
          defaultValue={order.amount}
        />
      </div>

      <UnCoSelect
        name={'location_id'}
        list={mapLocations}
        startOption={order.location_id}
        labelOption="Select Location: "
        fallbackOption="labelOption"
      />
      <Button>Submit</Button>
    </Form>
  )
}
