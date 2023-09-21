import React from 'react'

export default function OrderAdjust({ order, patchInventory, locations }) {
  const { amount, amountUnit } = order

  const [newAmount, setNewAmount] = React.useState(amount)
  const [newLocation, setNewLocation] = React.useState(order.location_id)

  function handleSubmit(e) {
    e.preventDefault()

    let isConsumed = false
    let parsedNewAmount = parseInt(newAmount)

    if (parsedNewAmount === 0) {
      isConsumed = true
    }
    const patchInventoryItem = {
      id: order.id,
      amount: parsedNewAmount,
      isConsumed,
      location_id: newLocation,
    }
    patchInventory(patchInventoryItem)
  }
  return (
    <form onSubmit={handleSubmit} style={{ marginTop: '1rem' }}>
      <label htmlFor="amount">
        Remaining Material:
        <input
          id="amount"
          value={newAmount}
          type="number"
          onChange={(e) => setNewAmount(e.target.value)}
        />
        {amountUnit}
      </label>
      <select
        value={newLocation ? newLocation : ''}
        onChange={(e) => setNewLocation(e.target.value)}
      >
        <option>Select Location:</option>
        {locations.map((location) => (
          <option value={location.id} key={location.id}>
            {location.locationName}
          </option>
        ))}
      </select>

      <button>Submit</button>
    </form>
  )
}
