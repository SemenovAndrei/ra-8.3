import { useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import useStorage from '../../hooks/useStorage'

export default function AuthProvider(props) {
  const [error, setError] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [token, setToken] = useStorage(localStorage, 'token')
  const [profile, setProfile] = useStorage(localStorage, 'profile', true)

  const handleInputLogin = (login) => {
    setLogin(login)
  }

  const handleInputPassword = (pass) => {
    setPassword(pass)
  }

  const handleLogin = async () => {
    setError('')
    try {
      const response = await fetch('http://localhost:7070/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ login: login, password: password }),
      })

      if (!response.ok) {
        const error = await response.json()

        throw new Error('Auth failed: ' + error.message)
      }

      const { token, profile } = await response.json()
      console.log(token, profile)

      setToken(token)
      setProfile(profile)
    } catch (e) {
      setError(e)
    } finally {
      setLogin('')
      setPassword('')
    }
  }

  const handleLogout = () => {
    setToken(null)
    setProfile(null)
  }
  return (
    <AuthContext.Provider
      value={{
        handleInputLogin,
        handleInputPassword,
        handleLogin,
        handleLogout,
        login,
        password,
        token,
        profile,
        error,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
