'use client'
import { Box, Paper, Skeleton } from '@mui/material'
import React, { useCallback, useEffect, useMemo } from 'react'
import AdminLayout from '@/modules/common/AdminLayout'
import {
  DataFromServerProps,
  NormalizedUserDataProps,
  UserRequestResponseProps,
} from '@/interfaces/Users'
import UserInfoModal from './components/UserInfoModal'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers, getNormalizedUserData } from './utils'
import { getDataFromLCS, storeDataToLCS } from '@/utils/lcsUtils'
import UsersTable from './components/UsersTable'
import axios from 'axios'
import SkeletonLoading from '@/modules/common/SkeletonLoading'

const UsersScreen = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedUserDataProps[] | null
  >(null)
  const usersFromLC = useMemo(() => getDataFromLCS('users'), [])
  const responseFromLC = { isLoading: false, error: null, data: usersFromLC }

  const response: UserRequestResponseProps = usersFromLC
    ? responseFromLC
    : useQuery({
        queryKey: ['usersData'],
        queryFn: fetchUsers,
      })

  const getNormalizedDataFromResponse = () => {
    return response?.data?.map?.(
      (d: DataFromServerProps) => getNormalizedUserData(d) || []
    )
  }

  const setNormalizedData = () => {
    setDataToDisplay(getNormalizedDataFromResponse())
  }

  const loadData = () => setDataToDisplay(usersFromLC)
  const backUpData = () => {
    storeDataToLCS('users', getNormalizedDataFromResponse())
  }
  const resetData = () => !!response.data && setNormalizedData()

  const handleLoadingData = useCallback(() => {
    if (usersFromLC && !dataToDisplay) loadData()
    if (!usersFromLC && !dataToDisplay && response.data) {
      setNormalizedData()
      backUpData()
    }
  }, [usersFromLC, typeof dataToDisplay, response.data])

  useEffect(() => {
    handleLoadingData()
  }, [typeof dataToDisplay, response.data, usersFromLC])

  return (
    <AdminLayout role='moderator' title='Foydalanuvchilar'>
      <Box my='50px'>
        {response.isLoading ? (
          <SkeletonLoading rows={10} />
        ) : (
          <Paper elevation={1} sx={{ p: '24px' }}>
            <UsersTable
              data={dataToDisplay}
              onDataReset={resetData}
              onInfoRequest={(id) => setOpenModal(true)}
            />
          </Paper>
        )}
      </Box>
      <UserInfoModal open={openModal} onClose={() => setOpenModal(false)} />
    </AdminLayout>
  )
}

export default UsersScreen
