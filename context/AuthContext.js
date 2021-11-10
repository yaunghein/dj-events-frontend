import { useRouter } from 'next/router'
import { useState, useEffect, createContext } from 'react'
import { NEXT_URL } from '@dj-config/index'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  //register user
  const register = async user => {
    const resp = await fetch(`${NEXT_URL}/api/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const data = await resp.json()

    if (resp.ok) {
      setUser(data.user)
      router.push(`/account/dashboard`)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  //login user
  const login = async ({ email: identifier, password }) => {
    const resp = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await resp.json()

    if (resp.ok) {
      setUser(data.user)
      router.push(`/account/dashboard`)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  //logout user
  const logout = async () => {
    const resp = await fetch(`${NEXT_URL}/api/logout`, { method: 'POST' })
    if (resp.ok) {
      setUser(null)
      router.push('/')
    }
  }

  //check if user is logged in
  const checkUserLoggedIn = async () => {
    const resp = await fetch(`${NEXT_URL}/api/user`)
    const data = await resp.json()
    resp.ok ? setUser(data.user) : setUser(null)
  }
  useEffect(() => checkUserLoggedIn(), [])

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
