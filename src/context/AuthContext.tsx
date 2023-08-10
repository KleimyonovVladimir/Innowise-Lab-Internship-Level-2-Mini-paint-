import { createContext, type FC, useContext, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  type User,
  type UserCredential
} from '@firebase/auth'
import { userRepository } from 'config/userRepository'
import { auth } from 'firebase-config'

interface IAuthContextProviderProps {
  children: React.ReactNode
}

interface IAuthContext {
  user: User | null
  authUserChangeHandler: (user: User | null) => void
  signIn: (email: string, password: string) => Promise<UserCredential>
  createUser: (email: string, password: string) => Promise<void>
  logOut: () => Promise<void>
}

const AuthContext = createContext<IAuthContext | undefined>(undefined)

export const AuthContextProvider: FC<IAuthContextProviderProps> = ({ children }) => {
  const [authUser, setAuthUser] = useState<User | null>(userRepository.getUser())

  const signIn = async (email: string, password: string): Promise<UserCredential> => {
    return await signInWithEmailAndPassword(auth, email, password)
  }

  const createUser = async (email: string, password: string): Promise<void> => {
    const response = await createUserWithEmailAndPassword(auth, email, password)

    setAuthUser(response.user)
    userRepository.setUser(response.user)
  }

  const logOut = async (): Promise<void> => {
    await signOut(auth)
    userRepository.removeUser()
    setAuthUser(null)
  }

  const authUserChangeHandler = (user: User | null): void => {
    setAuthUser(user)

    user ? userRepository.setUser(user) : userRepository.removeUser()
  }

  return (
    <AuthContext.Provider
      value={{ user: authUser, authUserChangeHandler, signIn, createUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// Consumers

export const useAuthContext = (): IAuthContext => {
  const context = useContext(AuthContext)

  if (context == null) {
    throw new Error('useAuthContext should be used within a AuthContextProvider')
  }

  return context
}
