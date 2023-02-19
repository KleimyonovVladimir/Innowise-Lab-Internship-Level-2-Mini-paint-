export interface IProps {
  setLineWidth: React.Dispatch<React.SetStateAction<number>>
  setLineColor: React.Dispatch<React.SetStateAction<string>>
  handleRadioChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
