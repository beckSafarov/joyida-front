'use client'
import { Box, Paper } from '@mui/material'
import React, { useCallback, useEffect, useMemo } from 'react'
import AdminLayout from '@/modules/common/AdminLayout'
import {
  DataFromServerProps,
  NormalizedUserDataProps,
} from '@/interfaces/Users'
import UserInfoModal from './components/UserInfoModal'
import { useQuery } from '@tanstack/react-query'
import { fetchUsers, getNormalizedUserData } from './utils'
import { getDataFromLCS } from '@/utils/lcsUtils'
import UsersTable from './components/UsersTable'
import SkeletonLoading from '@/modules/common/SkeletonLoading'

const UsersScreen = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedUserDataProps[] | null
  >(null)
  const usersFromLC = useMemo(() => getDataFromLCS('users'), [])

  const response = useQuery({
    queryKey: ['usersData'],
    queryFn: () => fetchUsers(page * rowsPerPage, rowsPerPage),
  })

  const getNormalizedDataFromResponse = () => {
    return response?.data?.map?.(
      (d: DataFromServerProps) => getNormalizedUserData(d) || []
    )
  }

  const setNormalizedData = () => {
    setDataToDisplay(getNormalizedDataFromResponse())
  }

  const resetData = () => !!response.data && setNormalizedData()

  const handleLoadingData = useCallback(() => {
    if (!dataToDisplay && response.data) {
      setNormalizedData()
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
              onRowClicked={() => setOpenModal(true)}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowChange={setRowsPerPage}
            />
          </Paper>
        )}
      </Box>
      <UserInfoModal open={openModal} onClose={() => setOpenModal(false)} />
    </AdminLayout>
  )
}

export default UsersScreen
