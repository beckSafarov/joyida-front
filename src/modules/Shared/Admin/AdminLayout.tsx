'use client'
import { Box } from '@mui/material'
import React from 'react'
import AdminNavbar from './Navbar'
import Sidebar from '@/modules/Admin/components/Sidebar'
import { AdminLayoutProps } from '@/modules/interfaces/AdminInterfaces'
import Title from '../Title'

const AdminLayout: React.FC<AdminLayoutProps> = ({ role, title, children }) => {
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
          <Box maxWidth='1000px' margin='0 auto' pt='30px' px='34px'>
            <Box sx={{ ml: '100px' }}>
              <Title textAlign='left'>{title}</Title>
              {children}
            </Box>
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
