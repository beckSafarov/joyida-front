import { category } from './Works'

export interface UsersTableRowProps {
  name: string
  phone: string
  address: string
  date: Date
  gender: 'male' | 'female'
  isBusiness: boolean
  jobTitle?: string
  categories?: category[]
}

export interface UsersTableDataToDisplay {
  name: string
  phone: string
  address: string
  date: string
  gender: 'erkak' | 'ayol'
  isBusiness: 'Biznes' | 'Oddiy'
  jobTitle?: string
  categories?: category[]
}

export interface FilterSubOption {
  label: string
  id: number | null
}

export interface FilterOption {
  name: string
  label: string
  options: FilterSubOption[]
}

export interface SelectFilterOption extends FilterOption {
  selectedSuboption: FilterSubOption
}
