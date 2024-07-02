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

export interface ComplaintOverPerson {
  name: string
  title: string
}

export interface CommentsDataProps {
  id: string
  image: string
  date: Date
  video: VideoProps
  to: ComplaintOverPerson
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

export interface UsersTableRowProps {
  name: string
  phone: string
  address: string
  date: Date
}

export interface AdTableRowDataProps {
  name: string
  location: string
  category: string
  beginningDate: Date
  endingDate: Date
}

export interface ReelsProps {
  id: string
  thumbnail: string
  title: string
  date: Date
  views: number
  status: boolean
}

export interface ReelsOptionProps {
  label: string
  id: string
}