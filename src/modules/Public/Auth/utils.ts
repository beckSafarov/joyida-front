// import jwt from 'jsonwebtoken'
import { LoggedUser } from '@/interfaces/Login'
import { getDataFromLCS, storeDataToLCS } from '@/utils/lcsUtils'
import axios from 'axios'
import { jwtVerify, KeyLike } from 'jose'

export const verifyToken = async (token: string, secret: string) => {
  try {
    const encodedSecret = new TextEncoder().encode(secret)
    const decoded = await jwtVerify(token, encodedSecret)
    return decoded
  } catch (err) {
    console.error('Token verification failed:', err)
    throw err
  }
}

export const getMe = async () => {
  const user_id = getDataFromLCS('user_id')
  try {
    const res = await axios.get(
      `https://account.joida.uz/auth/admin/${user_id}`
    )
    return res?.data?.data
  } catch (error) {
    return error
  }
}
