import React from 'react'

import styles from './Menu.module.css'

import Inventory from '../Inventory'
import Order from '../Order'
import Query from '../Query'
import Testing from '../Testing'
import Logout from '../Logout/Logout'
import Navbar from '../AAA/Navbar'

function Menu() {
  const pages = ['inventory', 'order', 'query', 'testing']

  // menu | inventory | order | query
  const [selectedPage, setSelectedPage] = React.useState('menu')
  return (
    <>
      <Navbar
        pages={pages}
        selectedPage={selectedPage}
        setSelectedPage={setSelectedPage}
        logoslot={<p className={styles.logo}>LOGO</p>}
        logoutslot={<Logout className={`${styles.link} ${styles.logout}`}>LOGOUT</Logout>}
      />
      <section>
        {selectedPage === 'inventory' && <Inventory />}
        {selectedPage === 'order' && <Order />}
        {selectedPage === 'query' && <Query />}
        {selectedPage === 'testing' && <Testing />}
      </section>
    </>
  )
}

export default Menu

/*
  <NavigationMenu.Root>
    <NavigationMenu.List>
      <NavigationMenu.Item>
        <NavigationMenu.Trigger />
        <NavigationMenu.Content>
          <NavigationMenu.Link />
        </NavigationMenu.Content>
      </NavigationMenu.Item>

      <NavigationMenu.Item>
        <NavigationMenu.Link />
      </NavigationMenu.Item>

      <NavigationMenu.Indicator />
    </NavigationMenu.List>

    <NavigationMenu.Viewport />
  </NavigationMenu.Root>
*/
/*
  <NavigationMenu.Root>
    <NavigationMenu.List>

      <NavigationMenu.Item>
        <NavigationMenu.Link />
      </NavigationMenu.Item>

      <NavigationMenu.Indicator />
    </NavigationMenu.List>

    <NavigationMenu.Viewport />
  </NavigationMenu.Root>
*/

/*
BACKUP
function Menu() {
  const pages = ['inventory', 'order', 'query', 'testing']

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
      {page === 'testing' && <Testing />}
    </section>
  )
}
*/
