import { useEffect, useState } from 'react'
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

      const { token } = await response.json()

      setToken(token)
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

  useEffect(() => {
    if (token) {
      setError('')
      const loadProfile = async () => {
        try {
          const response = await fetch('http://localhost:7070/private/me', {
            headers: { Authorization: 'Bearer ' + token },
          })

          if (!response.ok) {
            setToken(null)
            setProfile(null)
          }

          const profile = await response.json()
          setProfile(profile)
        } catch (e) {
          setError(e)
        }
      }
      loadProfile()
    }
  }, [token, setProfile, setToken])

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
