import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import AuthContext from '../../contexts/AuthContext'

const Element = styled.form`
  display: flex;
  justify-content: space-between;
`
const Input = styled.input`
  width: 40%;
  padding: 10px;
`
const Button = styled.button`
  width: 15%;
  font-size: inherit;
  color: green;
  border: 1px solid green;
  border-radius: 4px;
  cursor: pointer;
`

function FormLogin(props) {
  const {
    login,
    password,
    handleLogin,
    handleInputPassword,
    handleInputLogin,
  } = useContext(AuthContext)

  const buttonLogin = useRef(null)

  const onChangeLogin = (event) => {
    handleInputLogin(event.target.value)
  }

  const onChangePassword = (event) => {
    handleInputPassword(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    buttonLogin.current.blur()
    handleLogin()
  }
  return (
    <Element>
      <Input name="login" placeholder="Username" value={login} onChange={onChangeLogin} />
      <Input
        name="password"
        type="password"
        placeholder="Password"
        value={password}
        onChange={onChangePassword}
      />
      <Button ref={buttonLogin} onClick={onSubmit}>
        Login
      </Button>
    </Element>
  )
}

export default FormLogin
