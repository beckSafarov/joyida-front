import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
import { formatDate } from '@/utils/dateUtils'
import { getDataFromLCS } from '@/utils/lcsUtils'
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

function getCookie(cname: string) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) == ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const fetchUsers = async (offset: number, limit: number) => {
  const token = getCookie('access_token')
  console.log(token)
  const response = await axios.get(
    `https://account.joida.uz/auth/user/list?offset=${offset}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}
