import Button from '../AAA/Button'

export default function LocationsList({ locations, setSelectedLocation }) {
  return (
    <ul>
      <li key={'all'}>
        <Button onClick={() => setSelectedLocation({ id: 'all', locationName: 'all' })}>All</Button>
      </li>
      {locations.map(({ id, locationName }) => (
        <li key={id}>
          <Button onClick={() => setSelectedLocation({ id, locationName })}>{locationName}</Button>
        </li>
      ))}
    </ul>
  )
}
