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

export interface categoryFromServerProps {
  id: number
  name: string
}

export interface NewWorkValues {
  name: string
  categoryId: number
}

export interface NewCategoryModal extends NewAdminModalProps {
  onSubmit(newCategory: categoryFromServerProps): void
}

export interface NewWorkModalFace extends NewAdminModalProps {
  categories: categoryFromServerProps[]
}

export interface WorkEditModalProps extends NewAdminModalProps {
  workId: number | null
  categories: categoryFromServerProps[]
}

export interface WorkTableDataProps {
  id: number
  name: string
  category: string
  categoryId: number | null
}

export interface CategoriesFromServerProps {
  id: number
  name: string
}

export interface WorksDataFromServerProps extends CategoriesFromServerProps {
  category_id: number
}


export interface EditWorkValues extends NewWorkValues {}

export interface WorkFormBaseProps {
  initialValues: {
    name: string
    categoryId: number
  }
  onSubmit(values: { name: string; categoryId: number }): void
  onClose(): void
  categories: categoryFromServerProps[]
  mode?: 'create' | 'update'
}
