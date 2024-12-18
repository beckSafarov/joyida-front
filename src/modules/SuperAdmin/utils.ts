import adminTypes from '@/data/adminTypes'
import { AdminPropsFromServer } from '@/interfaces/superadmin'
import { accessHeader } from '@/utils'
import { formatDate } from '@/utils/dateUtils'
import axios from 'axios'

export const fetchAdmins = async () => {
  const response = await axios.get(
    'https://account.joida.uz/auth/admin/list?page=1&page_size=10',
    accessHeader
  )
  return response.data
}

const normalizePhone = (phone: string) => {
  return (
    `(${phone.slice(3, 5)}) ` +
    phone.slice(5, 8) +
    '-' +
    phone.slice(8, 10) +
    '-' +
    phone.slice(10, 12)
  )
}

export const normalizeData = (data: AdminPropsFromServer) => {
  const normalized = {
    ...data,
    name: data.first_name + ' ' + data.last_name,
    position: adminTypes[data.user_role as keyof {}],
    created_at: formatDate(data.created_at),
    phone: normalizePhone(data.phone),
  }
  return normalized
}
