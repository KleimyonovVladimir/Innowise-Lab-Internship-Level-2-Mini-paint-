import { type FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { TextField } from '@mui/material'
import Button from '@mui/material/Button'
import clsx from 'clsx'

import { type IProps } from './type'

import styles from './styles.module.scss'

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
  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <div className={clsx(styles.container, isMobile && styles.containerMobile)}>
      <h1 className={styles.loginTitle}>{title}</h1>
      <form onSubmit={onSubmit}>
        <div className={styles.inputsContainer}>
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
        <Button variant="contained" fullWidth type="submit" className={styles.loginButton}>
          {buttonText}
        </Button>
      </form>
      <div className={clsx(styles.loginMessage, isMobile && styles.loginMessageMobile)}>
        <p>{formMessage}</p>
        <Link to={link}>{linkText}</Link>
      </div>
    </div>
  )
}
export default LoginForm
