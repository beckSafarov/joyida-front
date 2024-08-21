import { ModalProps } from './common'

export interface NewAdminModalProps extends ModalProps {}

export interface LoginFormProps {
  phone: string
  password: string
}

export interface NewAdminValues extends LoginFormProps {
  first_name: string
  last_name: string
  position: string
}

export interface AdminPropsFromServer {
  first_name: string
  last_name: string
  phone: string
  position: string
  created_at: string
}
export interface NormalizedAdminProps {
  name: string
  phone: string
  position: string
  created_at: string
}
