import React from 'react'

import Inventory from '../Inventory'
import Order from '../Order'
import Query from '../Query'

function Menu() {
  const pages = ['inventory', 'order', 'query']

  // menu | inventory | order | query
  const [page, setPage] = React.useState('menu')
  return (
    <section>
      {pages.map((page) => (
        <button key={page} onClick={() => setPage(page)}>
          {page}
        </button>
      ))}
      {page === 'inventory' && <Inventory />}
      {page === 'order' && <Order />}
      {page === 'query' && <Query />}
    </section>
  )
}

export default Menu
