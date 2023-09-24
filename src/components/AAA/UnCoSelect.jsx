import React from 'react'

import styles from './UnCoSelect.module.css'

export default function UnCoSelect({
  list,
  name,
  label,
  labelOption,
  startOption,
  fallbackOption = 'listOption',
}) {
  const labelId = React.useId()
  const [state, setState] = React.useState(undefined)
  const [displayLabel, setDisplayLabel] = React.useState(undefined)

  // if a list is being fetched, need to re-set the states after it arrives
  React.useEffect(() => {
    if (startOption) {
      const selected = list.find((item) => item.value == startOption)
      setState(startOption)
      setDisplayLabel(selected.label)
      return
    }
    if (fallbackOption === 'listOption') {
      setState(list[0]?.value)
      setDisplayLabel(list[0]?.label)
      return
    }
    if (!labelOption) {
      throw new Error("fallbackOption = 'labelOption' requires a labelOption to be specified")
    }
    setDisplayLabel(labelOption)
  }, [list])

  /*
      <Wrapper>
      <NativeSelect value={value} onChange={onChange}>
        {children}
      </NativeSelect>
      <PresentationBit>
        {displayedValue}
        <IconWrapper style={{ '--size': 24 + 'px' }}>
          <Icon id="chevron-down" strokeWidth={1} size={24}></Icon>
        </IconWrapper>
      </PresentationBit>
    </Wrapper>
    */

  return (
    <div className={styles.wrapper}>
      {label && (
        <label htmlFor={labelId} className={styles.label}>
          {label}
        </label>
      )}
      <select
        id={labelId}
        className={styles.nativeSelect}
        value={state}
        name={name}
        onChange={(e) => {
          // for some reason, === doesn't work with int ?? perhaps option turns it into a string ?
          const selected = list.find((item) => item.value == e.target.value)
          if (!selected) {
            setState(null)
            setDisplayLabel(labelOption ? labelOption : 'error')
            return
          }
          setDisplayLabel(selected.label)
          setState(e.target.value)
        }}
      >
        {labelOption && <option value={undefined}>{labelOption}</option>}
        {list.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
      <div className={styles.presentationBit}>{displayLabel}</div>
    </div>
  )
}
