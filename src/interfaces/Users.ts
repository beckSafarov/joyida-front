import { AxiosError } from 'axios'
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
  birthDate: string
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

export interface UserRequestResponseProps {
  isLoading: boolean
  error: AxiosError | null
  data: any | null
}

export interface NormalizedUserDataProps {
  id: number
  email: string
  name: string
  activeStatus: string
  businessStatus: string
  birthDate: string
  createdAt: string
  phone: string
  gender: string
}

// export interface NormalizedUserDataProps
//   extends Omit<DataFromServerProps, keyof AdaptedProps>,
//     AdaptedProps {}

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
  data: NormalizedUserDataProps | null
  originalData?: DataFromServerProps | null
}
