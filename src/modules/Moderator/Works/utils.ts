import {
  CategoriesFromServerProps,
  WorksDataFromServerProps,
  WorkTableDataProps,
} from '@/interfaces/Works'
import axios from 'axios'
import { escape, trim } from 'lodash'

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

export const fetchServices = async (offset: number = 0, limit: number = 10) => {
  const response = await axios.get(
    `https://admin.joida.uz/api/service/?offset=${offset}&limit=${limit}`
  )
  return response.data
}

export const fetchCategories = async () => {
  const response = await axios.get(
    'https://admin.joida.uz/api/category?offset=0&limit=15'
  )
  return response.data
}

export const sanitizeString = (input: string) => {
  let sanitized = escape(input)
  sanitized = trim(sanitized)
  return sanitized
}
