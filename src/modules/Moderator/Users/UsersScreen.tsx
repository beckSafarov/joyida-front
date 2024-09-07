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

interface SelectedRow {
  open: boolean
  data: NormalizedUserDataProps | null
  originalData: DataFromServerProps | null
}

const UsersScreen = () => {
  const [openModal, setOpenModal] = React.useState<SelectedRow>({
    open: false,
    data: null,
    originalData: null,
  })
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(5)
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedUserDataProps[] | null
  >(null)
  const usersFromLC = useMemo(() => getDataFromLCS('users'), [])

  const response = useQuery({
    queryKey: ['usersData'],
    queryFn: () => fetchUsers(page * rowsPerPage, rowsPerPage),
  })

  console.log(response.data)

  const getNormalizedDataFromResponse = () => {
    return response?.data?.data?.map?.(
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

  const handleRowClick = (id: number) => {
    const selectedRow = dataToDisplay?.find(
      (data: NormalizedUserDataProps) => data.id === id
    )
    setOpenModal({
      open: true,
      data: selectedRow || null,
      originalData: response?.data?.data?.find(
        (prson: DataFromServerProps) => prson.id === id
      ),
    })
  }

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
              onRowClicked={handleRowClick}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={setPage}
              onRowChange={setRowsPerPage}
            />
          </Paper>
        )}
      </Box>
      <UserInfoModal
        {...openModal}
        onClose={() => setOpenModal({ ...openModal, open: false })}
      />
    </AdminLayout>
  )
}

export default UsersScreen
