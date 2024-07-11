export interface NewAdminModalProps {
  open: boolean
  onClose(): void
}

export interface LoginFormProps {
  phone: string
  password: string
}

export interface NewAdminValues extends LoginFormProps {
  name: string
  position: string
}
