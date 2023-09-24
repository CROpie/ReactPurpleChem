/*
import styles from './Form.module.css'

export default function Form({ children, onSubmit, ...delegated }) {
  return (
    <form onSubmit={onSubmit} className={styles.wrapper} {...delegated}>
      {children}
    </form>
  )
}
*/
import React from 'react'
import styles from './Form.module.css'

const Form = React.forwardRef(function Form({ children, onSubmit, ...delegated }, ref) {
  return (
    <form onSubmit={onSubmit} className={styles.wrapper} {...delegated} ref={ref}>
      {children}
    </form>
  )
})

export default Form
