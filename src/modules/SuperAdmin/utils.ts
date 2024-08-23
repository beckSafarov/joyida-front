import { AdminPropsFromServer } from '@/interfaces/superadmin'
import axios from 'axios'

export const fetchAdmins = async () => {
  const response = await axios.get(
    'https://account.joida.uz/auth/admin/list?page=1&page_size=10',
    {
      headers: {
        // Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo1LCJleHAiOjE3MjI5OTExMTV9.V2FJi4kpB7tatty-MKdTPcmZpeqqwnCSxhFF3i3o604`,
      },
    }
  )
  console.log(response)
  return response.data
}

export const normalizeData = (data: AdminPropsFromServer) => {
  // if (!data) return []
  const normalized = {
    ...data,
    name: data.first_name + ' ' + data.last_name,
    position: data.user_role === 0 ? 'moderator' : 'superadmin',
  }
  return normalized
}
