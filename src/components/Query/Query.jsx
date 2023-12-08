import React from 'react'
import QueryString from './QueryString'
import QueryTable from './QueryTable'
import QueryStructure from './QueryStructure'
import { useQuery } from '@tanstack/react-query'

import { TokenContext } from '../../contexts/TokenProvider'
import { toast } from 'react-toastify'

// ?queryType=structure | string
// ?queryString=<inchi> | string
import { DataURL } from '../constants'
import Heading from '../AAA/Heading'
import Button from '../AAA/Button'

async function getQueryData(inputQuery, JWT) {
  const { type, string } = inputQuery
  if (!inputQuery.string) {
    return null
  }
  const response = await fetch(`${DataURL}/ordersquery?queryType=${type}&queryString=${string}`, {
    headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
  })
  if (!response.ok) {
    toast.error(`Error (${response.statusText})`)
    return
  }

  const json = await response.json()
  return json
}

export default function Query() {
  // string | structure
  const [toggle, setToggle] = React.useState('string')

  const { JWT } = React.useContext(TokenContext)

  // { type: "string"/"structure, string: <input value> }
  const [inputQuery, setInputQuery] = React.useState({})
  console.log('input: ', inputQuery)

  // return value from queryFn stored in data object
  const { data } = useQuery({
    queryKey: ['query', inputQuery.string],
    queryFn: () => getQueryData(inputQuery, JWT),
  })

  const orders = data
  return (
    <section style={{ marginTop: '2rem' }}>
      <Heading level={3}>Query</Heading>
      <Button onClick={() => (toggle === 'string' ? setToggle('structure') : setToggle('string'))}>
        {toggle === 'string' ? 'Show structure search' : 'Show string search'}
      </Button>
      {toggle === 'string' && <QueryString setInputQuery={setInputQuery} />}
      {toggle === 'structure' && <QueryStructure setInputQuery={setInputQuery} />}
      {orders && orders.length > 0 && <QueryTable orders={orders} />}
    </section>
  )
}
