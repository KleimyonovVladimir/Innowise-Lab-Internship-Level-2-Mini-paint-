import { type FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/path'
import { useAuthContext } from 'context/AuthContext'
import { toastMessage } from 'utils/toastMessage'

import LoginForm from 'components/LoginForm'

const SignUpPage: FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { createUser } = useAuthContext()

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      await createUser(email, password)
      navigate(AppNavigationRoutes.SignIn)
    } catch (error) {
      error instanceof Error && toastMessage(error.message, 'error')
    }
  }

  return (
    <>
      <LoginForm
        title="Sign Up"
        buttonText="Sign Up"
        formMessage="Already have an account?"
        link={AppNavigationRoutes.SignIn}
        linkText="Sign In"
        onSubmit={handleSubmit}
        onChangeForEmail={handleEmail}
        onChangeForPassword={handlePassword}
      />
    </>
  )
}

export default SignUpPage
