import { LocationType } from './locations'

const categoryLabels = [
  'Restoranlar',
  "Go'zallik",
  'Salomatlik',
  'Texnik ishlar',
  'Hayot mamot',
]

export interface CategoryProps extends LocationType {}

const categories = categoryLabels.map((category: string, i: number) => ({
  label: category,
  id: i,
}))

export default categories
