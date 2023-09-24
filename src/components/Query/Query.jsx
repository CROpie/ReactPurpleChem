import React from 'react'
import QueryString from './QueryString'
import QueryTable from './QueryTable'

import { TokenContext } from '../../contexts/TokenProvider'
import { toast } from 'react-toastify'
import QueryStructure from './QueryStructure'

// ?queryType=structure | string
// ?queryString=<inchi> | string
import { DataURL } from '../constants'
import Heading from '../AAA/Heading'
import Button from '../AAA/Button'

function Query() {
  const [orders, setOrders] = React.useState([])
  // string | structure
  const [toggle, setToggle] = React.useState('string')
  // idle, loading, success, error
  const [status, setStatus] = React.useState('idle')
  const { JWT } = React.useContext(TokenContext)

  async function queryDatabase(type, querystring) {
    setStatus('loading')
    const response = await fetch(
      `${DataURL}/ordersquery?queryType=${type}&queryString=${querystring}`,
      {
        headers: { 'content-type': 'application/json', Authorization: `Bearer ${JWT}` },
      }
    )
    if (!response.ok) {
      toast.error(`Error (${response.statusText})`)
      setStatus('error')
      return
    }
    const json = await response.json()
    console.log(json)
    setStatus('success')
    setOrders(json)
  }

  return (
    <section style={{ marginTop: '2rem' }}>
      <Heading level={3}>Query</Heading>
      <Button onClick={() => (toggle === 'string' ? setToggle('structure') : setToggle('string'))}>
        {toggle === 'string' ? 'Show structure search' : 'Show string search'}
      </Button>
      {toggle === 'string' && <QueryString queryDatabase={queryDatabase} status={status} />}
      {toggle === 'structure' && <QueryStructure queryDatabase={queryDatabase} status={status} />}
      {status === 'loading' && <p>Loading...</p>}
      {status === 'error' && <p>There was a problem searching the database...</p>}
      <QueryTable orders={orders} />
    </section>
  )
}

export default Query
