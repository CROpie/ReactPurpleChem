// order
// id, amount, amountUnit, isConsumed, status, supplierPN, orderDate, CAS, chemicalName, full_name, supplierName

import styles from './Query.module.css'

const tableHeader = ['chemicalName', 'researcher', 'amount']
export default function QueryTable({ orders }) {
  return (
    <table className={styles.table}>
      <thead className={styles.head}>
        <tr>
          {tableHeader.map((header, index) => {
            return (
              <th
                className={
                  index === 0
                    ? styles.headrowleft
                    : index === tableHeader.length - 1
                    ? styles.headrowright
                    : styles.headrowcenter
                }
                key={index}
              >
                {header}
              </th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {orders?.map(({ id, chemicalName, full_name, amount, amountUnit }) => (
          <tr key={id} className={styles.bodyrow}>
            <td className={styles.bodyrowitemleft}>{chemicalName}</td>
            <td className={styles.bodyrowitemcenter}>{full_name}</td>
            {/* <td className={styles.bodyrowitem}>{orderDate}</td> */}
            <td className={styles.bodyrowitemright}>
              {amount} {amountUnit}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
