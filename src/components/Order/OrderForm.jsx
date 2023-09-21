import React from 'react'

const amountUnitList = ['mg', 'g', 'mL', 'L']

export default function OrderForm({ placeOrder, suppliers }) {
  const [amount, setAmount] = React.useState('')
  const [amountUnit, setAmountUnit] = React.useState(amountUnitList[1])
  const [supplier_id, setSupplier] = React.useState('')
  console.log(supplier_id)

  function handleSubmit(e) {
    e.preventDefault()
    placeOrder(parseInt(amount), amountUnit, parseInt(supplier_id))
  }
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="amount">
        Amount:
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min="0"
        />
        <select value={amountUnit} onChange={(e) => setAmountUnit(e.target.value)}>
          {amountUnitList.map((unit) => (
            <option value={unit} key={unit}>
              {unit}
            </option>
          ))}
        </select>
        <select value={supplier_id} onChange={(e) => setSupplier(e.target.value)}>
          <option>Select Supplier:</option>
          {suppliers.map((supplier) => (
            <option value={supplier.id} key={supplier.id}>
              {supplier.supplierName}
            </option>
          ))}
        </select>
      </label>
      <button>Submit</button>
    </form>
  )
}
/*
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
      */
