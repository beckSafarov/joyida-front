import { NewAdminModalProps } from './superadmin'

export interface ModeratorWorkRow {
  id: string
  name: string
  category: string
}

// work category
export interface category {
  label: string
  categoryId: string
}

export interface NewWorkValues {
  name: string
  categoryId: string
}

export interface NewWorkModalFace extends NewAdminModalProps {
  categories: category[]
}

export interface WorkEditModalProps extends NewAdminModalProps {
  workId: string
  categories: category[]
}

export interface EditWorkValues extends NewWorkValues {}

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
