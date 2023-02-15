import { type FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import { AppNavigationRoutes } from 'constants/path'
import { useAuthContext } from 'context/AuthContext'

const Gallery: FC = () => {
  const navigate = useNavigate()

  const { logOut } = useAuthContext()

  const signOutClick = async (): Promise<void> => {
    try {
      await logOut()
      navigate(AppNavigationRoutes.SignIn)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div>Gallery page</div>
      <Button variant="outlined" onClick={signOutClick}>
        Sign Out
      </Button>
    </>
  )
}

export default Gallery
