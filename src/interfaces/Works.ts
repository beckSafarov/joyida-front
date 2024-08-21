import { NewAdminModalProps } from './superadmin'

export interface ModeratorWorkRow {
  id: string
  name: string
  category: string
}

// work category
export interface category {
  name: string
  id: number
}

export interface NewWorkValues {
  name: string
  category_id: number
}
export interface EditWorkValues extends NewWorkValues {}

export interface NewCategoryModal extends NewAdminModalProps {
  onSubmit(newCategory: category): void
}

export interface NewWorkModalFace extends NewAdminModalProps {
  categories: category[]
}

export interface WorkEditModalProps extends NewAdminModalProps {
  workId: number | null
  categories: category[]
}

export interface WorkDataProps {
  id: number
  name: string
  category_id: number
  category: category
}

export interface WorkFormBaseProps {
  initialValues: {
    name: string
    category_id: number
  }
  onSubmit(values: { name: string; category_id: number }): void
  onClose(): void
  categories: category[]
  mode?: 'create' | 'update'
}
