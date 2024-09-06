import axios from 'axios'
import Cookies from 'js-cookie'

export const setCookie = (name: string, value: string) => {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=${value}`
}

export const createColumnData = (
  id: string,
  label: string,
  minWidth: number
) => ({ id, label, minWidth })

export const refreshHeader = {
  headers: {
    Authorization: `Bearer ${Cookies.get('refresh_token')}`,
  },
}
export const accessHeader = {
  headers: {
    Authorization: `Bearer ${Cookies.get('access_token')}`,
  },
}

export const getAvatarLetters = (name: string) => {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
}

// export const fetchData = async(address: string, payload: any) => {
//   const token = Cookies.get('refresh_token')
//   const response = await axios.get(
//     `${address}/pa`,
//     {
//       headers: { Authorization: `Bearer ${token}` },
//     }
//   )
//   return response.data
// }
