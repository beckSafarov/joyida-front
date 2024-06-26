export interface TableRowFace {
  name: string
  phone: string
  position: string
  date: Date
}

export interface ModeratorWorkRow {
  id: string
  name: string
  category: string
}

export interface NewAdminModalProps {
  open: boolean
  onClose(): void
}

export interface category {
  label: string
  categoryId: string
}

export interface NewWorkModalFace extends NewAdminModalProps {
  categories: category[]
}

export interface NewAdminValues {
  name: string
  phone: string
  position: string
}
export interface NewWorkValues {
  name: string
  categoryId: string
}

export interface AdminLayoutProps {
  children?: React.ReactNode
  role?: 'superadmin' | 'moderator'
}
