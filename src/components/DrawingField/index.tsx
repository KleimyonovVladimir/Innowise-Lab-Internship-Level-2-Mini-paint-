import { type FC } from 'react'

import { type IProps } from './type'

import styles from './styles.module.scss'

const DrawingField: FC<IProps> = ({ canvasRef, onMouseDown, onMouseUp, onMouseMove }) => {
  return (
    <div className={styles.container}>
      <canvas
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        ref={canvasRef}
        className={styles.canvas}
      />
    </div>
  )
}

export default DrawingField
