import { type FC } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Button } from '@mui/material'
import clsx from 'clsx'

import { type IProps } from './type'

import styles from './styles.module.scss'

const ImageCard: FC<IProps> = ({ cardItem, onDelete }) => {
  const handleDeleteCard = async (): Promise<void> => {
    await onDelete(cardItem.url, cardItem.id)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <li className={styles.cardItem}>
      <div className={clsx(styles.imageWrapper, isMobile && styles.imageWrapperMobile)}>
        <img src={cardItem.url} alt={cardItem.title} />
      </div>
      <div className={styles.cardsInfoWrapper}>
        <div className={styles.caption}>
          <p>
            Title: <span className={styles.cardsInfo}>{cardItem.title}</span>
          </p>
          <p>
            Name: <span className={styles.cardsInfo}>{cardItem.name}</span>
          </p>
        </div>
        <Button color="error" variant="text" onClick={handleDeleteCard}>
          Delete
        </Button>
      </div>
    </li>
  )
}

export default ImageCard
