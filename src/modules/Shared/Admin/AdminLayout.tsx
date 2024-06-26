'use client'
import { Box } from '@mui/material'
import React from 'react'
import AdminNavbar from './Navbar'
import Sidebar from '@/modules/Admin/components/Sidebar'
import { AdminLayoutProps } from '@/modules/interfaces/AdminInterfaces'

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
          <Box
            // bgcolor='yellow'
            maxWidth='1000px'
            margin='0 auto'
            pt='30px'
            px='34px'
          >
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
