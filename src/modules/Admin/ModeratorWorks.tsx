'use client'
import { Box, Stack } from '@mui/material'
import React from 'react'
import Title from '../Shared/Title'
import AdminNavbar from '../Shared/Admin/Navbar'
import AdminLayout from '../Shared/Admin/AdminLayout'
import { useRouter } from 'next/router'
import { usePathname } from 'next/navigation'

const ModeratorWorksScreen = () => {
  return (
    <AdminLayout role='moderator'>
      <Stack direction='row'>
        <Box
          sx={{
            flex: '4',
            p: '26px 44px',
          }}
        >
          <Title>Content</Title>
        </Box>
      </Stack>
    </AdminLayout>
  )
}

export default ModeratorWorksScreen
