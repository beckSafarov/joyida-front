import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
import { getCookie } from '@/utils'
import { formatDate } from '@/utils/dateUtils'
import axios from 'axios'

export const getNormalizedUserData = (
  dataFromServer: DataFromServerProps
): NormalizedUserDataProps => {
  return {
    ...dataFromServer,
    id: String(dataFromServer.id),
    name: dataFromServer.first_name + ' ' + dataFromServer.last_name,
    isActive: dataFromServer.is_active ? 'Aktiv' : 'Yopiq',
    birthDate: formatDate(dataFromServer.birth_of_date),
    createdAt: formatDate(dataFromServer.created_at),
    updatedAt: formatDate(dataFromServer.updated_at),
    isBusiness: dataFromServer.business ? 'Biznes' : 'Oddiy',
  }
}

export const fetchUsers = async (offset: number, limit: number) => {
  const token = getCookie('refresh_token')
  console.log(token)
  const response = await axios.get(
    `https://account.joida.uz/auth/user/list?offset=${offset}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}
