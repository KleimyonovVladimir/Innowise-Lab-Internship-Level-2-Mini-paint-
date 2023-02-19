import { type FC, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import { addDoc, collection } from '@firebase/firestore'
import { Button, TextField } from '@mui/material'
import clsx from 'clsx'
import { AppNavigationRoutes } from 'constants/path'
import { dataBase, storageRef } from 'firebase-config'
import { toastMessage } from 'utils/toastMessage'

import DrawingField from 'components/DrawingField'
import Toolbar from 'components/Toolbar'

import styles from './styles.module.scss'

const DrawingPage: FC = () => {
  const navigate = useNavigate()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState<number>(1)
  const [lineColor, setLineColor] = useState<string>('black')
  const [tool, setTool] = useState<string>('brush')
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (canvas) {
      canvas.width = 1400
      canvas.height = 650
    }

    if (context) {
      context.lineJoin = 'round'
      context.lineCap = 'round'
    }
  }, [])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!context) return
    context.beginPath()

    context.strokeStyle = lineColor
    context.lineWidth = lineWidth

    setIsDrawing(true)

    setCoordinates({
      x: event.nativeEvent.offsetX,
      y: event.nativeEvent.offsetY
    })
  }

  const endDrawing = (): void => {
    setIsDrawing(false)
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) {
      return
    }
    const { offsetX, offsetY } = event.nativeEvent

    const context = canvasRef.current?.getContext('2d')

    if (!context) {
      return
    }

    context.strokeStyle = lineColor
    context.lineWidth = lineWidth

    if (tool === 'brush') {
      context.beginPath()
      context.moveTo(coordinates.x, coordinates.y)
      context.lineTo(offsetX, offsetY)
      context.stroke()
      context.save()

      setCoordinates({ x: offsetX, y: offsetY })
      context.closePath()
    } else if (tool === 'circle') {
      const radius = Math.sqrt(
        Math.pow(offsetX - coordinates.x, 2) + Math.pow(offsetY - coordinates.y, 2)
      )
      clear(context)
      context.beginPath()
      context.arc(coordinates.x, coordinates.y, radius, 0, 2 * Math.PI)
      context.stroke()
      context.closePath()
    } else if (tool === 'line') {
      clear(context)
      context.beginPath()
      context.moveTo(coordinates.x, coordinates.y)
      context.lineTo(offsetX, offsetY)
      context.stroke()
      context.closePath()
    } else if (tool === 'rectangle') {
      clear(context)
      context.beginPath()
      context.rect(coordinates.x, coordinates.y, offsetX - coordinates.x, offsetY - coordinates.y)
      context.stroke()
      context.closePath()
    }
  }

  const clear = (context: CanvasRenderingContext2D): void => {
    context.clearRect(0, 0, canvasRef.current?.width ?? 0, canvasRef.current?.height ?? 0)
  }

  const saveImage = async (fireBaseName: string): Promise<string> => {
    const canvas = canvasRef.current
    let url = ''

    if (canvas) {
      const dataUrl = canvas.toDataURL()
      const blob = await fetch(dataUrl).then(async res => res.blob())

      const fileRef = storageRef.child(`images/${fireBaseName}`)

      await fileRef.put(blob)

      url = await fileRef.getDownloadURL()
    }

    return url
  }

  const handleSaveImage = async (): Promise<void> => {
    const url = await saveImage(`${name}-${title}`)

    await addDoc(collection(dataBase, 'images'), {
      name: name.toLowerCase(),
      title: title.toLowerCase(),
      url,
      date: new Date()
    })

    toastMessage('Your image successfully saved', 'success')

    navigate(AppNavigationRoutes.Index)
  }

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setTool(event.target.value)
  }

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })

  return (
    <div>
      <div className={clsx(styles.canvasWrapper, isMobile && styles.canvasWrapperMobile)}>
        <Toolbar
          setLineColor={setLineColor}
          setLineWidth={setLineWidth}
          handleRadioChange={handleRadioChange}
        />
        <DrawingField
          canvasRef={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
        />
      </div>

      <div className={styles.inputsDrawingWrapper}>
        <TextField
          variant="outlined"
          value={name}
          label="Name"
          onChange={event => {
            setName(event.target.value)
          }}
        />
        <TextField
          variant="outlined"
          value={title}
          label="Title"
          onChange={event => {
            setTitle(event.target.value)
          }}
        />
      </div>
      <Button
        style={{ width: 'fit-content', height: 'fit-content' }}
        type="submit"
        variant="outlined"
        onClick={handleSaveImage}
      >
        Save
      </Button>
    </div>
  )
}

export default DrawingPage
