import React from 'react'
import UnCoInput from '../AAA/UnCoInput'
import Heading from '../AAA/Heading'
import Button from '../AAA/Button'
import Form from '../AAA/Form'

const LOGIN_LIST = [
  { label: 'Email: ', type: 'email', name: 'username' },
  { label: 'Password: ', type: 'password', name: 'password', minLength: '6' },
]

function LoginForm({ logIn }) {
  function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)
    logIn(data)
  }

  return (
    <section style={{ marginTop: '1rem' }}>
      {/* <Heading level={4}>Log In Form</Heading> */}
      <Form onSubmit={handleSubmit}>
        {LOGIN_LIST.map(({ label, type, name, minLength }) => {
          return (
            <UnCoInput key={name} label={label} type={type} name={name} minLength={minLength} />
          )
        })}
        <Button>Submit</Button>
      </Form>
    </section>
  )
}

export default LoginForm
