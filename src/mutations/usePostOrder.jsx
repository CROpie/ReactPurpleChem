import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DataURL } from '../components/constants'

import { toast } from 'react-toastify'

/*
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

    const response = await fetch(`${DataURL}/order`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      body: JSON.stringify({ chemicalData, orderData }),
    })
    if (!response.ok) {
      toast.error(`Error (${response.statusText}`)
      setStatus('idle')
      return
    }
    const json = await response.json()
    toast.success('Order Placed.')
    setStatus('idle')
  }
*/

async function postLocation(chemicalData, orderData, JWT) {
  const response = await fetch(`${DataURL}/order`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ chemicalData, orderData }),
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText}`)
    return
  }
  const json = await response.json()
  toast.success('Order Placed.')
  return { json }
}

export const usePostOrder = (JWT) => {
  return useMutation({
    mutationFn: async ({ chemicalData, orderData }) => postLocation(chemicalData, orderData, JWT),
    onSuccess: () => {},
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
