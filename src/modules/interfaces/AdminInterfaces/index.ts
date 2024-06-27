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

export interface EditWorkValues extends NewWorkValues {}

export interface AdminLayoutProps {
  children?: React.ReactNode
  role?: 'superadmin' | 'moderator'
  title?: string
}

interface VideoProps {
  title: string
  author: string
}

export interface CommentsDataProps {
  id: string
  image: string
  date: Date
  video: VideoProps
  author: string
  rating: number
  body: string
}

export interface WorkEditModalProps extends NewAdminModalProps {
  workId: string
  categories: category[]
}

export interface WorkFormBaseProps {
  initialValues: {
    name: string
    categoryId: string
  }
  onSubmit(values: { name: string; categoryId: string }): void
  onClose(): void
  categories: category[]
  mode?: 'create' | 'update'
}