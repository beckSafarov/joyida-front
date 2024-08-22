import { WorkDataProps } from '@/interfaces/Works'
import axios from 'axios'
import { escape, trim } from 'lodash'
import { uniqBy } from 'lodash'

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

export const getCategoriesFromWorks = (works: WorkDataProps[]) => {
  const categories = works.map((service: WorkDataProps) => service.category)
  const uniqCategories = uniqBy(categories, 'id')
  return uniqCategories
}
