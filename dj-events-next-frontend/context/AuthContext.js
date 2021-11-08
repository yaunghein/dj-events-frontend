import { useRouter } from 'next/router'
import { useState, useEffect, createContext } from 'react'
import { NEXT_URL } from '@dj-config/index'

const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  //register user
  const register = async user => {
    console.log(user)
  }

  //login user
  const login = async ({ email: identifier, password }) => {
    const resp = await fetch(`${NEXT_URL}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier, password }),
    })
    const data = await resp.json()
    console.log(data)

    if (resp.ok) {
      setUser(data.user)
    } else {
      setError(data.message)
      setError(null)
    }
  }

  //logout user
  const logout = async () => {
    console.log('Logged out.')
  }

  //check if user is logged in

  const checkUserLoggedIn = async () => {
    console.log('Checked.')
  }

  return (
    <AuthContext.Provider value={{ user, error, register, login, logout, checkUserLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthContextProvider }
