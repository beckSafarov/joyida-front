import { ModalProps } from './common'

export interface NewAdminModalProps extends ModalProps {}

export interface LoginFormProps {
  phone: string
  password: string
}

export interface NewAdminValues extends LoginFormProps {
  name: string
  position: string
}
