import { type FC, memo, useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Link } from 'react-router-dom'
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from '@firebase/firestore'
import { deleteObject, ref } from '@firebase/storage'
import { TextField } from '@mui/material'
import clsx from 'clsx'
import { AppNavigationRoutes } from 'constants/path'
import { dataBase, storage } from 'firebase-config'
import useDebounce from 'hooks/useDebounce'

import ImageCard from 'components/ImageCard'

import { type ICard } from './type'

import styles from './styles.module.scss'

const Gallery: FC = memo(() => {
  const [cardsList, setCardsList] = useState<ICard[]>([])
  const [searchedName, setSearchedName] = useState<string>('')

  const collectionStore = collection(dataBase, 'images')

  const debouncedSearchTerm = useDebounce(searchedName, 500)

  const getData = async (): Promise<void> => {
    const q = query(
      collectionStore,
      where('name', '>=', debouncedSearchTerm),
      where('name', '<=', debouncedSearchTerm + '\uf8ff'),
      orderBy('name', 'desc')
    )

    const data = await getDocs(q)

    const cards = data.docs.map(docItem => {
      return { ...docItem.data(), id: docItem.id }
    })

    setCardsList(cards as ICard[])
  }

  useEffect(() => {
    getData().catch(console.error)
  }, [debouncedSearchTerm])

  const handleDeleteCard = async (url: string, id: string): Promise<void> => {
    await deleteObject(ref(storage, url))
    await deleteDoc(doc(dataBase, 'images', id))
    await getData()
  }

  const handleSearchCard = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchedName(event.target.value)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 576px)' })

  return (
    <>
      <div className={clsx(styles.galleryInfo, isMobile && styles.galleryInfoMobile)}>
        <div className={clsx(styles.searchWrapper, isMobile && styles.searchWrapperMobile)}>
          <h2 className={styles.pageTitle}>Gallery page</h2>
          <TextField
            variant="standard"
            value={searchedName}
            placeholder="Search by user name"
            onChange={handleSearchCard}
          />
        </div>
        <Link to={AppNavigationRoutes.DrawingPage} className={styles.toDrawingLink}>
          Start drawing
        </Link>
      </div>

      <ul className={styles.cardsList}>
        {cardsList.map(card => {
          return <ImageCard key={card.id} cardItem={card} onDelete={handleDeleteCard} />
        })}
      </ul>
    </>
  )
})

export default Gallery
