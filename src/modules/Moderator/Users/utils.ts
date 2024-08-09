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
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJleHAiOjE3MjI5OTExMTV9.V2FJi4kpB7tatty-MKdTPcmZpeqqwnCSxhFF3i3o604`,
    },
  })
  return response.data
}