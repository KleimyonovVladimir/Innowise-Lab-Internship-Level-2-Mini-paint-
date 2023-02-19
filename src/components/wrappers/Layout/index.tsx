import { type FC } from 'react'

import Header from 'components/Header'

import { type IProps } from './type'

import styles from './styles.module.scss'

const Layout: FC<IProps> = ({ children }) => {
  return (
    <>
      <Header />
      <div className={styles.content}>{children}</div>
    </>
  )
}

export default Layout
