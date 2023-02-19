export interface IProps {
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>
  onMouseDown: (event: React.MouseEvent<HTMLCanvasElement>) => void
  onMouseUp: () => void
  onMouseMove: (event: React.MouseEvent<HTMLCanvasElement>) => void
}
