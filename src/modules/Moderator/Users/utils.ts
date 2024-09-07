import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
import { refreshHeader } from '@/utils'
import { formatDate } from '@/utils/dateUtils'
import axios from 'axios'

export const getNormalizedUserData = (
  dataFromServer: DataFromServerProps
): NormalizedUserDataProps => {
  const gender = dataFromServer.gender.toLocaleLowerCase()

  return {
    id: dataFromServer.id,
    email: dataFromServer.email,
    gender:
      gender === 'true' ? 'Erkak' : gender === 'false' ? 'Ayol' : "Noma'lum",
    phone: dataFromServer.phone,
    name: dataFromServer.first_name + ' ' + dataFromServer.last_name,
    activeStatus: dataFromServer.is_active ? 'Aktiv' : 'Yopiq',
    birthDate: formatDate(dataFromServer.birthDate),
    createdAt: formatDate(dataFromServer.created_at),
    businessStatus: dataFromServer.business ? 'Biznes' : 'Oddiy',
  }
}

export const fetchUsers = async (offset: number, limit: number) => {
  const response = await axios.get(
    `https://account.joida.uz/auth/user/list?page=${offset}&page_size=${limit}`,
    refreshHeader
  )
  return response.data
}
