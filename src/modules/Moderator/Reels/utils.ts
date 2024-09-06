import { NormalizedReelsData, ReelsDataFromServer } from '@/interfaces/Reels'
import axios from 'axios'
import Cookies from 'js-cookie'
const api = process.env.NEXT_PUBLIC_API_3

export const fetchReels = async (offset: number, limit: number) => {
  const token = Cookies.get('refresh_token')
  const response = await axios.get(
    `${api}/reels/list?offset=${offset}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  )
  return response.data
}

export const getNormalizedReelsData = (
  data: ReelsDataFromServer[]
): NormalizedReelsData[] => {
  return data.map((d) => ({
    ...d,
    is_checked: d.is_checked !== 'None',
  }))
}

// export const fetchUsers = async (offset: number, limit: number) => {
//   const token = getCookie('refresh_token')
//   console.log(token)
//   const response = await axios.get(
//     `https://account.joida.uz/auth/user/list?offset=${offset}&limit=${limit}`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   )
//   return response.data
// }
