import {PaginationProps} from 'react-bootstrap';

export type PaginatorProps = {
  totalItems: number
  pageSize: number
  currentPage: number
  setPage: (page: number) => void
  disabled?: boolean
  sideLength?: number,
  size?: PaginationProps['size']
}