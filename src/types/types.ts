export interface ISnapshot {
  data: Uint8ClampedArray
  colorSpace: PredefinedColorSpace
  height: number
  width: number
  ImageData?: ImageData
}
