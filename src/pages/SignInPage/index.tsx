import { type FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/path'
import { useAuthContext } from 'context/AuthContext'
import { toastMessage } from 'utils/toastMessage'

import LoginForm from 'components/LoginForm'

const SignInPage: FC = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const authContext = useAuthContext()
  const { signIn } = useAuthContext()

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setEmail(event.target.value)
  }
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setPassword(event.target.value)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()

    try {
      const response = await signIn(email, password)
      authContext.authUserChangeHandler(response.user)

      navigate(AppNavigationRoutes.Index)
    } catch (error) {
      error instanceof Error && toastMessage(error.message, 'error')
    }
  }

  return (
    <>
      <LoginForm
        title="Sign In"
        buttonText="Sign In"
        formMessage="Don't have an account yet?"
        link={AppNavigationRoutes.SignUp}
        linkText="Sign Up"
        onSubmit={handleSubmit}
        onChangeForEmail={handleEmail}
        onChangeForPassword={handlePassword}
      />
    </>
  )
}

export default SignInPage
