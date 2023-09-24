import React from 'react'

import styles from './Navbar.module.css'
import Logout from '../Logout/Logout'

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
              <button className={style} key={page} onClick={() => setSelectedPage(page)}>
                {page}
              </button>
            )
          })}
        </div>
        {logoutslot}
      </nav>
    </>
  )
}
