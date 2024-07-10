export interface NewAdminModalProps {
  open: boolean
  onClose(): void
}

export interface NewAdminValues {
  name: string
  phone: string
  position: string
}
