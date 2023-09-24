import Button from '../AAA/Button'

export default function LocationsList({ locations, setSelectedLocation }) {
  return (
    <ul>
      <li key={'all'}>
        <Button onClick={() => setSelectedLocation({ value: 'all', label: 'all' })}>All</Button>
      </li>
      {locations.map(({ value, label }) => (
        <li key={value}>
          <Button onClick={() => setSelectedLocation({ value, label })}>{label}</Button>
        </li>
      ))}
    </ul>
  )
}
