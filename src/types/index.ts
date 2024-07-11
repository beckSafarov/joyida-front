import { SvgIconComponent } from '@mui/icons-material'

export type FilterByTypes = string | ''

export type FilterType = {
  by: string | ''
  option: string
}

export type InfoRowType = {
  name: string
  icon: SvgIconComponent
}
