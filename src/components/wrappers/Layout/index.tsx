import { type FC } from 'react'

import { type IProps } from './type'

const Layout: FC<IProps> = ({ children }) => {
  return <div>{children}</div>
}

export default Layout
