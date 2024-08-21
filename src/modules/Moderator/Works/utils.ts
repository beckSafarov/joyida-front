import axios from 'axios'
import { escape, trim } from 'lodash'

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
