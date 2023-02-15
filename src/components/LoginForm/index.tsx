import { type FC } from 'react'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'

import { styles } from './styles'
import { type IProps } from './type'

const LoginForm: FC<IProps> = ({
  title,
  buttonText,
  formMessage,
  link,
  linkText,
  onSubmit,
  onChangeForEmail,
  onChangeForPassword
}) => {
  return (
    <div style={styles.container}>
      <h1 style={styles.loginTitle}>{title}</h1>
      <form onSubmit={onSubmit}>
        <div style={styles.inputsContainer}>
          <TextField
            variant="standard"
            name="email"
            type="email"
            label="Email"
            placeholder="example@gmail.com"
            onChange={onChangeForEmail}
          />
          <TextField
            variant="standard"
            name="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            onChange={onChangeForPassword}
          />
        </div>
        <Button variant="contained" fullWidth type="submit" style={styles.loginButton}>
          {buttonText}
        </Button>
      </form>
      <div style={styles.loginMessage}>
        <p>{formMessage}</p>
        <Link to={link}>{linkText}</Link>
      </div>
    </div>
  )
}
export default LoginForm
