import React, { type FC, Suspense } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from 'context/AuthContext'

const UnauthenticatedApp = React.lazy(async () => await import('./UnauthenticatedApp'))
const AuthenticatedApp = React.lazy(async () => await import('./AuthenticatedApp'))

const App: FC = () => {
  const { user } = useAuthContext()

  return (
    <Suspense fallback={<>Loading...</>}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {user ? (
            <Route path="*" element={<AuthenticatedApp />} />
          ) : (
            <Route path="*" element={<UnauthenticatedApp />} />
          )}
        </Routes>
      </BrowserRouter>
    </Suspense>
  )
}

export default App
