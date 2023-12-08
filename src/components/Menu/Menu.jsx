import React from 'react'

import styles from './Menu.module.css'

import Logout from '../Logout/Logout'
import Navbar from '../AAA/Navbar'

function Menu() {
  const pages = ['inventory', 'order', 'query']

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
    </>
  )
}

export default Menu
