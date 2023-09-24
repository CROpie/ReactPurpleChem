import React from 'react'
import UnCoInput from '../AAA/UnCoInput'
import Button from '../AAA/Button'
import Form from '../AAA/Form'

export default function QueryString({ queryDatabase, status }) {
  const isLoading = status === 'loading'

  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const querystring = String(formData.get('querystring'))
    queryDatabase('string', querystring)
  }
  return (
    <Form onSubmit={handleSubmit}>
      <UnCoInput name={'querystring'} label={'Chemical name, CAS or user'} />
      <Button disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
    </Form>
  )
}
