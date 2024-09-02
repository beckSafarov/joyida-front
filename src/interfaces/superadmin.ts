import { ModalProps } from './common'

export interface NewAdminModalProps extends ModalProps {}


export interface LoginFormProps {
  phone: string
  password: string
}

export interface NewAdminFormProps extends LoginFormProps {
  first_name: string
  last_name: string
  position: number
}

export interface NewAdminValues extends LoginFormProps {
  first_name: string
  last_name: string
  is_admin: boolean
  is_moderator: boolean
  user_role: number
}

export interface AdminPropsFromServer {
  id: number
  first_name: string
  last_name: string
  phone: string
  position: string
  created_at: string
  birth_date: string
  is_admin: boolean
  is_moderator: boolean
  user_role: number
}
export interface NormalizedAdminProps {
  id: number
  name: string
  phone: string
  position: string
  created_at: string
}

export interface EditAdminModalProps extends ModalProps {
  data: NormalizedAdminProps | null
}
