import React, { useContext } from 'react'
import styled from 'styled-components'
import AuthContext from '../../contexts/AuthContext'

const Element = styled.div`
  width: 22%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Circle = styled.div`
  overflow: hidden;
  border-radius: 50%;
`
const Img = styled.img`
  display: block;
  object-fit: cover;
`
const Button = styled.button`
  width: 33%;
  padding: 10px;
  font-size: inherit;
  color: red;
  border: 1px solid red;
  border-radius: 4px;
  cursor: pointer;
`

function ProfileBar(props) {
  const { profile, handleLogout } = useContext(AuthContext)

  return (
    <Element>
      Hello, {profile.name}
      <Circle>
        <Img src={profile.avatar} alt={profile.name} />
      </Circle>
      <Button onClick={handleLogout}>Logout</Button>
    </Element>
  )
}

export default ProfileBar
