import {
  CategoriesFromServerProps,
  WorksDataFromServerProps,
  WorkTableDataProps,
} from '@/interfaces/Works'
import axios from 'axios'

export const getCategoryNameById = (
  id: number,
  categories: CategoriesFromServerProps[] | undefined
) => {
  return categories?.find((cat) => cat.id === id)?.name || ''
}

export const getNormalizedWorksData = (
  data: WorksDataFromServerProps,
  categories: CategoriesFromServerProps[] | undefined
): WorkTableDataProps => {
  return {
    ...data,
    categoryId: data.category_id,
    category: getCategoryNameById(data.category_id, categories),
  }
}

export const fetchServices = async () => {
  const response = await axios.get('https://admin.joida.uz/api/service/')
  return response.data
}

export const fetchCategories = async () => {
  const response = await axios.get('https://admin.joida.uz/api/category/')
  return response.data
}
