export type StatusProps = {
  status: string
  editable:boolean
  setStatus: (status: string) => void
  fetching: boolean
}