import React from 'react'
import { TokenContext } from '../../contexts/TokenProvider'
import UnCoInput from '../AAA/UnCoInput'
import { toast } from 'react-toastify'

import { DataURL } from '../constants'
import Form from '../AAA/Form'
import Button from '../AAA/Button'

export default function NewLocation({ setRefreshKey, setShowNewLocation }) {
  const { JWT } = React.useContext(TokenContext)

  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const newLocation = String(formData.get('newLocation'))
    if (!newLocation) return

    addNewLocation(newLocation)
  }

  async function addNewLocation(newLocation) {
    // setStatus('loading')

    const response = await fetch(`${DataURL}/location`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      body: JSON.stringify({ locationName: newLocation }),
    })
    if (!response.ok) {
      toast.error(`Failed to add location: (${response.statusText})`)
      // setStatus('error')
      return
    }
    const json = await response.json()
    setShowNewLocation(false)
    setRefreshKey((currentRefreshKey) => currentRefreshKey + 1)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <UnCoInput label="New Location" name="newLocation" />
      <Button>Submit</Button>
    </Form>
  )
}
