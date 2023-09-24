import React from 'react'
import JSME from '../AAA/JSME'
import Form from '../AAA/Form'
import Button from '../AAA/Button'

export default function QueryStructure({ queryDatabase, status }) {
  const isLoading = status === 'loading'

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const inchi = String(formData.get('inchi'))

    queryDatabase('structure', inchi)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <JSME />
      <Button disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
    </Form>
  )
}
