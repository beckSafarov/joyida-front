'use client'
import { Box } from '@mui/material'
import React, { useEffect, useMemo } from 'react'
import AdminNavbar from './Navbar'
import { AdminLayoutProps } from '@/interfaces/common'
import Title from './Title'
import Sidebar from '@/modules/Moderator/common/Sidebar'
import StoreProvider from './StoreProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'react-toastify/dist/ReactToastify.css'
import { getCookie, setCookie } from '@/utils'
import axios, { AxiosError } from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import { getDataFromLCS, storeDataToLCS } from '@/utils/lcsUtils'
import { fromNowToUnixDate } from '@/utils/dateUtils'
import { verifyToken } from '../Public/Auth/utils'
const queryClient = new QueryClient()

const AdminLayout: React.FC<AdminLayoutProps> = ({ role, title, children }) => {
  const accessToken = useMemo(() => getCookie('access_token'), [])
  const refreshToken = useMemo(() => getCookie('refresh_token'), [])
  const secret = process.env.NEXT_PUBLIC_JWT_TOKEN || ''

  useEffect(() => {
    if (!refreshToken) handleRefreshSession()
    // if (refreshToken) checkTokenIfExpiring()
  }, [accessToken, refreshToken])

  const handleResToRefresh = async (token: string) => {
    setCookie('refresh_token', token)
    const decoded = await verifyToken(token, secret)
    const exp = decoded.payload.exp
    storeDataToLCS('session', {
      exp: exp,
      created: new Date(),
    })
  }

  const handleRefreshSession = async () => {
    try {
      const { data } = await axios.post(
        'https://account.joida.uz/auth/token/refresh',
        {
          access_token: getCookie('access_token'),
        }
      )
      handleResToRefresh(data.access_token)
    } catch (error: AxiosError | any) {
      console.error(error)
      toast(`${error.name}: ${error.message}`, { type: 'error' })
    }
  }

  const checkTokenIfExpiring = () => {
    const exp = getDataFromLCS('session')?.exp
    console.log(typeof exp)
    const diff = fromNowToUnixDate(exp)
    console.log(diff)
  }

  const handleExpiringToken = () => {}

  return (
    <StoreProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        {role === 'superadmin' ? (
          <Box pt='30px' maxWidth='1300px' margin='0 auto'>
            <AdminNavbar />
            {children}
          </Box>
        ) : (
          <>
            <Box p='30px'>
              <AdminNavbar />
            </Box>
            <Sidebar />
            <Box maxWidth='1200px' margin='0 auto' pt='30px' px='34px'>
              <Box sx={{ ml: '200px' }}>
                <Title textAlign='left'>{title}</Title>
                {children}
              </Box>
            </Box>
          </>
        )}
      </QueryClientProvider>
    </StoreProvider>
  )
}

AdminLayout.defaultProps = {
  role: 'superadmin',
}

export default AdminLayout
