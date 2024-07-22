import { category } from './Works'
import { NewAdminModalProps } from './superadmin'

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


export interface DataFromServerProps {
  id: number
  birth_of_date: string
  business: string
  created_at: string
  email: string
  first_name: string
  last_name: string
  gender: string
  image_path: string
  is_active: boolean
  phone: string
  updated_at: string
}

type AdaptedProps = {
  id: string
  name: string
  isActive: string
  updatedAt: string
  birthDate: string
  createdAt: string
  isBusiness: string
}

export interface NormalizedUserDataProps
  extends Omit<DataFromServerProps, keyof AdaptedProps>,
    AdaptedProps {}

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

export interface UserInfoModalProps extends NewAdminModalProps {
  id?: number
}