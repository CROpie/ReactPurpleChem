import React from 'react'

import styles from './Heading.module.css'

const VALID_TAGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

export default function Heading({ level, children }) {
  if (typeof level !== 'number' || level < 1 || level > 6) {
    throw new Error(`Unrecognized heading level: ${level}`)
  }

  const HeadingTag = `h${level}`

  return (
    <>
      <HeadingTag className={styles.heading}>{children}</HeadingTag>
    </>
  )
}
