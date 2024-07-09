import { LocationType } from './locationsData'

const categoryLabels = [
  'Restoranlar',
  "Go'zallik",
  'Salomatlik',
  'Texnik ishlar',
  'Hayot mamot',
]

export interface CategoryProps extends LocationType {}

const categoriesData = categoryLabels.map((category: string, i: number) => ({
  label: category,
  id: i,
}))

export default categoriesData
