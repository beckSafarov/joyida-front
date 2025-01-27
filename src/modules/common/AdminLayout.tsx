'use client'
import { Box } from '@mui/material'
import React from 'react'
import AdminNavbar from './Navbar'
import { AdminLayoutProps } from '@/interfaces/common'
import Title from './Title'
import Sidebar from '@/modules/Moderator/common/Sidebar'

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
          <Box maxWidth='1200px' margin='0 auto' pt='30px' px='34px'>
            <Box sx={{ ml: '200px' }}>
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
