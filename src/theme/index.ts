import { createTheme } from '@mui/material'

export const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    fontSize: 16
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          textTransform: 'initial',
          fontWeight: 500,
          boxShadow: 'none',
          transition: 'all 0.1s ease',

          '&:hover': {
            boxShadow: 'none'
          }
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: '100%'
        }
      }
    }
  }
})
