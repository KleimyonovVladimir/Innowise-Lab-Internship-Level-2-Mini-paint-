import { type User } from 'firebase/auth'

const KEY = 'authUser'

interface IUserRepository {
  getUser: () => User | null
  setUser: (user: User) => void
  removeUser: () => void
}

export const createUserRepository = (): IUserRepository => ({
  getUser: () => {
    const user = localStorage.getItem(KEY)

    return user ? JSON.parse(user) : null
  },
  setUser: user => {
    localStorage.setItem(KEY, JSON.stringify(user))
  },
  removeUser: () => {
    localStorage.removeItem(KEY)
  }
})

export const userRepository = createUserRepository()
