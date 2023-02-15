export const styles = {
  container: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500px'
  },
  loginTitle: {
    marginBottom: '32px'
  },
  inputsContainer: {
    display: 'grid',
    gridRowGap: '35px',
    marginBottom: '40px'
  },
  loginMessage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '20px',
    fontSize: '18px'
  },
  loginButton: {
    padding: '10px 0'
  }
} as const
