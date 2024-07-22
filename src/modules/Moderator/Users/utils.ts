import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
import { formatDate } from '@/utils/dateUtils'

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
