import QueryWrapper from '@/modules/common/QueryWrapper'
import SuperAdminHomeScreen from '@/modules/SuperAdmin'
import { QueryClient } from '@tanstack/react-query'
import React from 'react'

const SuperAdminHomePage = () => {
  return (
    <QueryWrapper>
      <SuperAdminHomeScreen />
    </QueryWrapper>
  )
}

export default SuperAdminHomePage
