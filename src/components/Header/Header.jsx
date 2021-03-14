import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import FormLogin from '../FormLogin/FormLogin'
import styled from 'styled-components'
import AuthContext from '../../contexts/AuthContext'
import ProfileBar from '../ProfileBar/ProfileBar'

const Element = styled.div`
  margin-top: 20px;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
`
const Wrapper = styled.div`
  display: flex;
  align-items: center;
`
const Error = styled.div`
  color: red;
  margin-right: 10px;
`
const Logo = styled.div`
  font-weight: bold;
  font-size: 1.5rem;
`

function Header(props) {
  const { error, profile } = useContext(AuthContext)

  console.log(profile)

  return (
    <Element>
      <Logo>Neto Social</Logo>
      {!profile ? (
        <Wrapper>
          <Error>{error.message}</Error>
          <FormLogin />
        </Wrapper>
      ) : (
        <ProfileBar />
      )}
    </Element>
  )
}

Header.propTypes = {}

export default Header
