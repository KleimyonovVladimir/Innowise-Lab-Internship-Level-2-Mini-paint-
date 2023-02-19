import { type FC } from 'react'
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material'

import { type IProps } from './type'

import styles from './styles.module.scss'

const Toolbar: FC<IProps> = ({ setLineColor, setLineWidth, handleRadioChange }) => {
  const handleLineColor = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLineColor(event.target.value)
  }

  const handleLineWidth = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setLineWidth(Number(event.target.value))
  }

  return (
    <div>
      <div className={styles.parameters}>
        <div>
          <label className={styles.parametersLabel}>Color</label>
          <input type="color" onChange={handleLineColor} />
        </div>
        <div>
          <label className={styles.parametersLabel}>Stroke Width</label>
          <input type="range" min="1" max="20" onChange={handleLineWidth} defaultValue={1} />
        </div>
      </div>
      <FormControl>
        <FormLabel>Tools</FormLabel>
        <RadioGroup defaultValue="brush" name="radio-buttons-group" onChange={handleRadioChange}>
          <FormControlLabel value="brush" control={<Radio />} label="Brush" />
          <FormControlLabel value="line" control={<Radio />} label="Line" />
          <FormControlLabel value="rectangle" control={<Radio />} label="Rectangle" />
          <FormControlLabel value="circle" control={<Radio />} label="Circle" />
        </RadioGroup>
      </FormControl>
    </div>
  )
}

export default Toolbar
