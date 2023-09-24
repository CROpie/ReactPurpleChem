import styles from './Button.module.css'

export default function Button({ type = 'submit', children, ...delegated }) {
  return (
    <button type={type} className={styles.button} {...delegated}>
      {children}
    </button>
  )
}
