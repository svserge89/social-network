import {ButtonProps} from 'react-bootstrap';

export type PageNavToolbarProps = {
  total: number
  size: number
  page: number
  setPage: (page: number) => void
  setSize: (size: number) => void
  available: Array<string>
  sideLength?: number
  buttonSize?: ButtonProps['size']
  fetching?: boolean
}