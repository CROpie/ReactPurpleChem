import { useMutation, useQueryClient } from '@tanstack/react-query'

import { DataURL } from '../components/constants'

import { toast } from 'react-toastify'

async function postLocation(newLocation, JWT) {
  const response = await fetch(`${DataURL}/location`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
    body: JSON.stringify({ locationName: newLocation }),
  })
  if (!response.ok) {
    toast.error(`Failed to add location: (${response.statusText})`)
    return
  }
  const json = await response.json()
  return { json }
}

export const usePostLocation = (setShowNewLocation, JWT) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ newLocation }) => postLocation(newLocation, JWT),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] })
      setShowNewLocation(false)
    },
    onError: (error) => {
      console.error('onError something went wrong...', error)
    },
  })
}
