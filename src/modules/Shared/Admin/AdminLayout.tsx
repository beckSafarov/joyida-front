'use client'
import { Box } from '@mui/material'
import React from 'react'
import AdminNavbar from './Navbar'
import Sidebar from '@/modules/Admin/components/Sidebar'

interface AdminLayoutProps {
  children?: React.ReactNode
  role?: 'superadmin' | 'moderator'
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ role, children }) => {
  return (
    <>
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
            {children}
          </Box>
        </>
      )}
    </>
  )
}

AdminLayout.defaultProps = {
  role: 'superadmin',
}

export default AdminLayout
