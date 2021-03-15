import { useEffect, useState } from 'react'
import AuthContext from '../../contexts/AuthContext'
import useStorage from '../../hooks/useStorage'

export default function AuthProvider(props) {
  const [error, setError] = useState('')
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const [news, setNews] = useState('')

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
      const response = await fetch(process.env.REACT_APP_URL_AUTH, {
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
    setNews('')
    setToken(null)
    setProfile(null)
  }

  useEffect(() => {
    if (token) {
      setError('')
      const loadProfile = async (url, setState) => {
        try {
          const response = await fetch(url, {
            headers: { Authorization: 'Bearer ' + token },
          })

          if (!response.ok) {
            setNews('')
            setToken(null)
            setProfile(null)
          }

          const state = await response.json()
          setState(state)
        } catch (e) {
          setError(e)
        }
      }

      loadProfile(`${process.env.REACT_APP_URL_USER}/me`, setProfile)
      loadProfile(`${process.env.REACT_APP_URL_USER}/news`, setNews)
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
        news,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
