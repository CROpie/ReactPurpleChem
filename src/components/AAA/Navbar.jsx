import React from 'react'

import styles from './Navbar.module.css'
import Logout from '../Logout/Logout'

import { Link } from 'react-router-dom'

export default function Navbar({ selectedPage, setSelectedPage, pages, logoslot, logoutslot }) {
  return (
    <>
      <nav className={styles.nav}>
        {logoslot}

        <div className={styles.links}>
          {pages.map((page) => {
            const style =
              page === selectedPage ? `${styles.link} ${styles.selectedPage}` : styles.link
            return (
              <Link to={page} className={style} key={page} onClick={() => setSelectedPage(page)}>
                {page}
              </Link>
            )
          })}
        </div>
        {logoutslot}
      </nav>
    </>
  )
}
