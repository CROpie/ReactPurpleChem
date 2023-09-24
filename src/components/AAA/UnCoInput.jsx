import React from 'react'

import styles from './UnCoInput.module.css'

export default function UnCoInput({ label, type = 'text', name, defaultValue, ...delegated }) {
  const [state, setState] = React.useState(defaultValue ? defaultValue : '')
  const id = React.useId()

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        value={state}
        onChange={(e) => setState(e.target.value)}
        {...delegated}
      />
    </div>
  )
}
