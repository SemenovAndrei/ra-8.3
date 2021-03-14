import { createContext } from 'react'

const AuthContext = createContext({
  login: '',
  password: '',
  error: '',
  token: null,
  profile: null,
})

export default AuthContext
