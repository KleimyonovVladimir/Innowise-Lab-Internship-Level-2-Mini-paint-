import { type FC, useEffect, useRef, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import { useNavigate } from 'react-router'
import { addDoc, collection } from '@firebase/firestore'
import { Button, TextField } from '@mui/material'
import clsx from 'clsx'
import { CANVAS_SIZE } from 'constants/canvas'
import { AppNavigationRoutes } from 'constants/path'
import { dataBase, storageRef } from 'firebase-config'
import { type ISnapshot } from 'types/types'
import { toastMessage } from 'utils/toastMessage'

import DrawingField from 'components/DrawingField'
import Toolbar from 'components/Toolbar'

import styles from './styles.module.scss'

const DrawingPage: FC = () => {
  const navigate = useNavigate()

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const contextRef = useRef<CanvasRenderingContext2D | null>(null)

  const [snapshot, setSnapshot] = useState<ISnapshot>({
    data: new Uint8ClampedArray(0),
    colorSpace: 'srgb',
    height: CANVAS_SIZE.height,
    width: CANVAS_SIZE.width
  })

  const [isDrawing, setIsDrawing] = useState(false)
  const [lineWidth, setLineWidth] = useState<number>(1)
  const [lineColor, setLineColor] = useState<string>('black')
  const [tool, setTool] = useState<string>('brush')
  const [name, setName] = useState<string>('')
  const [title, setTitle] = useState<string>('')

  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const context = canvas?.getContext('2d', {
        willReadFrequently: true
      })

      if (context) {
        context.lineJoin = 'round'
        context.lineCap = 'round'
      }
      contextRef.current = context
    }
  }, [])

  const startDrawing = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    setIsDrawing(true)
    const context = contextRef.current

    if (!context) return

    const { offsetX, offsetY } = event.nativeEvent

    const x = offsetX
    const y = offsetY

    context.beginPath()

    context.lineWidth = lineWidth
    context.strokeStyle = lineColor

    if (tool === 'brush') {
      drawDot(offsetX, offsetY)
    }

    setSnapshot(context?.getImageData(0, 0, context?.canvas.width, context?.canvas.height))
    setCoordinates({
      x,
      y
    })
  }

  const endDrawing = (): void => {
    setIsDrawing(false)
  }

  const drawDot = (offsetX: number, offsetY: number): void => {
    const context = contextRef.current

    context?.moveTo(offsetX, offsetY)
    context?.lineTo(offsetX, offsetY)
    context?.stroke()
  }

  const draw = (event: React.MouseEvent<HTMLCanvasElement>): void => {
    if (!isDrawing) return

    const { offsetX, offsetY } = event.nativeEvent

    const context = contextRef.current

    context?.putImageData(snapshot, 0, 0)

    if (tool === 'brush') {
      context?.lineTo(offsetX, offsetY)
      context?.stroke()
    } else if (tool === 'circle') {
      context?.beginPath()

      const radius = Math.sqrt(
        Math.pow(offsetX - coordinates.x, 2) + Math.pow(offsetY - coordinates.y, 2)
      )
      context?.arc(coordinates.x, coordinates.y, radius, 0, 2 * Math.PI)
      context?.stroke()
    } else if (tool === 'line') {
      context?.beginPath()
      context?.moveTo(coordinates.x, coordinates.y)
      context?.lineTo(offsetX, offsetY)
      context?.stroke()
    } else if (tool === 'rectangle') {
      context?.strokeRect(
        coordinates.x,
        coordinates.y,
        offsetX - coordinates.x,
        offsetY - coordinates.y
      )
      context?.closePath()
    }
  }

  const clearCanvas = (): void => {
    const context = contextRef.current
    context?.clearRect(0, 0, context.canvas.width, context.canvas.height)
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
      <Button
        style={{ width: 'fit-content', height: 'fit-content', marginLeft: '15px' }}
        type="submit"
        variant="outlined"
        onClick={clearCanvas}
      >
        Clear
      </Button>
    </div>
  )
}

export default DrawingPage
