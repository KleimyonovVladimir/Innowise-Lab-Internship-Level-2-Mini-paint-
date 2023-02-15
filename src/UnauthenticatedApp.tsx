import React, { type FC } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/path'

const SignInPage = React.lazy(async () => await import('./pages/SignInPage'))
const SignUpPage = React.lazy(async () => await import('./pages/SignUpPage'))

const UnauthenticatedApp: FC = () => {
  return (
    <Routes>
      <Route path={AppNavigationRoutes.SignIn} element={<SignInPage />} />
      <Route path={AppNavigationRoutes.SignUp} element={<SignUpPage />} />
      <Route path="*" element={<Navigate to={AppNavigationRoutes.SignIn} replace />} />
    </Routes>
  )
}

export default UnauthenticatedApp
