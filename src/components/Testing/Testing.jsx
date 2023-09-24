import React from 'react'

import UnCoInput from '../AAA/UnCoInput'
import UnCoSelect from '../AAA/UnCoSelect'

const optionList = [
  { label: 'abc', value: 1 },
  { label: 'def', value: 2 },
]

function Testing() {
  const [selectValue, setSelectValue] = React.useState(optionList[0].value)

  function testFunction2(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const getGoodbye = formData.get('goodbye')
    console.log(getGoodbye)
  }

  function testSelect(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    const something = formData.get('abc')
    console.log(something)
    console.log(data)
    console.log(selectValue)
  }

  return (
    <section style={{ marginTop: '4rem', marginBottom: '4rem' }}>
      <h6>UnCo2</h6>
      <form onSubmit={testFunction2}>
        <UnCoInput type="text" name="yoyoyo" maxLength="6" />
        <button>Press</button>
      </form>
      <form onSubmit={testSelect}>
        <select
          value={selectValue}
          onChange={(e) => setSelectValue(e.target.value)}
          name={'select'}
        >
          {optionList.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <button>SELECT</button>
      </form>
    </section>
  )
}

export default Testing
