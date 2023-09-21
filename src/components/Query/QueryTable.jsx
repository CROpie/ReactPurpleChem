// order
// id, amount, amountUnit, isConsumed, status, supplierPN, orderDate, CAS, chemicalName, full_name, supplierName

const tableHeader = ['chemicalName', 'full_name', 'orderDate', 'amount']
export default function QueryTable({ orders }) {
  return (
    <table style={{ marginTop: '4rem' }}>
      <thead>
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {orders?.map(({ id, chemicalName, full_name, orderDate, amount, amountUnit }) => (
          <tr key={id}>
            <td>{chemicalName}</td>
            <td>{full_name}</td>
            <td>{orderDate}</td>
            <td>
              {amount} {amountUnit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
