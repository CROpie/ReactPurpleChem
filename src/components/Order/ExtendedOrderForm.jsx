import React from 'react'
import JSME from '../AAA/JSME'
import UnCoInput from '../AAA/UnCoInput'

const MANUAL_PROPERTIES = [
  { label: 'Chemical Name', value: 'chemicalName' },
  { label: 'Molecular Weight', value: 'MW' },
  { label: 'Boiling Point', value: 'BP' },
  { label: 'Melting Point', value: 'MP' },
  { label: 'Density', value: 'density' },
]

export default function extendedOrderForm() {
  return (
    <section style={{ display: 'flex', gap: '2rem' }}>
      <JSME />
      <div>
        {MANUAL_PROPERTIES.map(({ label, value }) => (
          <UnCoInput key={value} label={label} name={value} />
        ))}
      </div>
    </section>
  )
}
