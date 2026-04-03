'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  email: string
  name: string
}

interface AuthContextProps {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  signup: (email: string, password: string, name: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

const PUBLIC_ROUTES = ['/login', '/signup']

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const stored = localStorage.getItem('cryptovault-user')
    if (stored) {
      setUser(JSON.parse(stored))
    }
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (!isLoading) {
      const isPublicRoute = PUBLIC_ROUTES.includes(pathname)
      
      if (!user && !isPublicRoute) {
        router.push('/login')
      } else if (user && (pathname === '/login' || pathname === '/signup')) {
        router.push('/dashboard')
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulated authentication - in production, this would be a real API call
    if (email && password.length >= 6) {
      const storedUsers = localStorage.getItem('cryptovault-users')
      const users = storedUsers ? JSON.parse(storedUsers) : {}
      
      // Check if user exists and password matches
      if (users[email] && users[email].password === password) {
        const user = { email, name: users[email].name }
        localStorage.setItem('cryptovault-user', JSON.stringify(user))
        setUser(user)
        return true
      }
    }
    return false
  }

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulated signup - in production, this would be a real API call
    if (email && password.length >= 6 && name.trim()) {
      const storedUsers = localStorage.getItem('cryptovault-users')
      const users = storedUsers ? JSON.parse(storedUsers) : {}
      
      // Check if user already exists
      if (users[email]) {
        return false
      }
      
      // Store new user
      users[email] = { password, name }
      localStorage.setItem('cryptovault-users', JSON.stringify(users))
      
      // Auto-login after signup
      const newUser = { email, name }
      localStorage.setItem('cryptovault-user', JSON.stringify(newUser))
      setUser(newUser)
      return true
    }
    return false
  }

  const logout = () => {
    localStorage.removeItem('cryptovault-user')
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
