import { type ICard } from 'pages/Gallery/type'

export interface IProps {
  cardItem: ICard
  onDelete: (url: string, id: string) => Promise<void>
}
