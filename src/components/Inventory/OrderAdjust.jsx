import React from 'react'

import { DataURL } from '../constants'

import { toast } from 'react-toastify'
import { TokenContext } from '../../contexts/TokenProvider'
import UnCoInput from '../AAA/UnCoInput'
import UnCoSelect from '../AAA/UnCoSelect'
import Button from '../AAA/Button'
import Form from '../AAA/Form'

export default function OrderAdjust({ order, setRefreshKey, locations }) {
  const { amountUnit } = order

  const { JWT } = React.useContext(TokenContext)

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
    console.log(patchInventoryItem)
    patchInventory(patchInventoryItem)
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

    toast.success('Updated.')
    setRefreshKey((currentRefreshKey) => currentRefreshKey + 1)
  }

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
        list={locations}
        startOption={order.location_id}
        labelOption="Select Location: "
        fallbackOption="labelOption"
      />
      <Button>Submit</Button>
    </Form>
  )
}
