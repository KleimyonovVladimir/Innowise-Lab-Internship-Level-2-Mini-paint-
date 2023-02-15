import { type FC } from 'react'
import { Route, Routes } from 'react-router'
import { Navigate } from 'react-router-dom'
import { AppNavigationRoutes } from 'constants/path'
import Gallery from 'pages/Gallery'

import Layout from 'components/wrappers/Layout'

const AuthenticatedApp: FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path={AppNavigationRoutes.Index} element={<Gallery />} />
        <Route path={AppNavigationRoutes.Error404} element={<>Error</>} />
        <Route
          path={AppNavigationRoutes.SignIn}
          element={<Navigate to={AppNavigationRoutes.Index} replace />}
        />
        <Route path="*" element={<Navigate to={AppNavigationRoutes.Error404} replace />} />
      </Routes>
    </Layout>
  )
}

export default AuthenticatedApp
