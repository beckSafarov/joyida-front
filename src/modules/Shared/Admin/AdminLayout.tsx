'use client'
import { Box } from '@mui/material'
import React from 'react'
import AdminNavbar from './Navbar'

interface AdminLayoutProps {
  children?: React.ReactNode
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <Box maxWidth='1200px' margin='0 auto'>
      <AdminNavbar />
      {children}
    </Box>
  )
}

export default AdminLayout
