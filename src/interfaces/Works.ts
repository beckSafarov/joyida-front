import { NewAdminModalProps } from './superadmin'

export interface ModeratorWorkRow {
  id: string
  name: string
  category: string
}

// work category
export interface category {
  label: string
  categoryId: number
}

export interface NewWorkValues {
  name: string
  categoryId: number
}

export interface NewCategoryModal extends NewAdminModalProps {
  onSubmit(newCategory: category): void
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
    categoryId: number
  }
  onSubmit(values: { name: string; categoryId: number }): void
  onClose(): void
  categories: category[]
  mode?: 'create' | 'update'
}
