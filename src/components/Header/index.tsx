import { type FC } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'
import { AppNavigationRoutes } from 'constants/path'
import { toastMessage } from 'utils/toastMessage'

import { useAuthContext } from '../../context/AuthContext'

import styles from './styles.module.scss'

const Header: FC = () => {
  const navigate = useNavigate()

  const { logOut } = useAuthContext()

  const signOutClick = async (): Promise<void> => {
    try {
      await logOut()
      navigate(AppNavigationRoutes.SignIn)
    } catch (error) {
      error instanceof Error && toastMessage(error.message, 'error')
    }
  }

  return (
    <header className={styles.header}>
      <Link to={AppNavigationRoutes.Index} className={styles.logo}>
        <h1>Mini paint</h1>
      </Link>
      <Button variant="contained" onClick={signOutClick}>
        Sign out
      </Button>
    </header>
  )
}

export default Header
