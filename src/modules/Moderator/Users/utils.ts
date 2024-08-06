import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
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

export const fetchUsers = async () => {
  const response = await axios.get('https://account.joida.uz/auth/user/list', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjMwMDIxNzQsInVzZXJfaWQiOjV9.Dusmpl8zLeaCBaRV6elI33cWR47JkHVdclxk8psWAh8`,
    },
  })
  console.log(response)
  return response.data
}
