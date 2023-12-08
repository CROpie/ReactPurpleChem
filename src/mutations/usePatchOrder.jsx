import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DataURL } from '../components/constants'

import { toast } from 'react-toastify'

/*
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
*/

async function patchInventory(patchInventoryItem, JWT) {
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
  return { json }
}

export const usePatchOrder = (JWT) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ patchInventoryItem }) => patchInventory(patchInventoryItem, JWT),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      toast.success('Updated.')
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
