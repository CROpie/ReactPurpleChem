import React from 'react'
import JSME from '../AAA/JSME'
import Form from '../AAA/Form'
import Button from '../AAA/Button'

export default function QueryStructure({ setInputQuery, status }) {
  const isLoading = status === 'loading'

  const handleSubmit = (e) => {
    console.log('inside handle')
    e.preventDefault()
    const formData = new FormData(e.target)
    const inchi = String(formData.get('inchi'))

    if (!inchi) return
    setInputQuery({ type: 'structure', string: inchi })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <JSME />
      <Button disabled={isLoading}>{isLoading ? 'Searching...' : 'Search'}</Button>
    </Form>
  )
}
