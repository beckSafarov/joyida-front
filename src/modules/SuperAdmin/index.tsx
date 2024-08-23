'use client'
import React, { useEffect } from 'react'
import NewAdminModal from './components/NewAdminModal'
import AdminLayout from '../common/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import { fetchAdmins, normalizeData } from './utils'
import SkeletonLoading from '../common/SkeletonLoading'
import SuperAdminTable from './components/SuperAdminTable'
import { Box } from '@mui/material'
import {
  AdminPropsFromServer,
  NormalizedAdminProps,
} from '@/interfaces/superadmin'
import EditAdminModal from './components/EditAdminModal'

interface SuperAdminHomeScreenProps {}

interface EditAdminModalProps {
  open: boolean
  data: NormalizedAdminProps | null
}

const SuperAdminHomeScreen: React.FC<SuperAdminHomeScreenProps> = ({}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [openModal, setOpenModal] = React.useState(false)
  const [openEditModal, setOpenEditModal] = React.useState<EditAdminModalProps>(
    { open: false, data: null }
  )
  const [dataToDisplay, setDataToDisplay] = React.useState([])
  const res = useQuery({
    queryKey: ['adminData'],
    queryFn: fetchAdmins,
  })

  const getNormalizedData = () => {
    return res.data.map((d: AdminPropsFromServer) => normalizeData(d))
  }

  const handleLoadingData = () => {
    if (res.data) setDataToDisplay(getNormalizedData())
  }

  useEffect(() => {
    handleLoadingData()
  }, [res.data])

  const handleEditClicked = (data: NormalizedAdminProps) => {
    setOpenEditModal({ open: true, data })
  }

  return (
    <AdminLayout title='Adminlar'>
      <Box mt='50px'>
        {res.isLoading ? (
          <SkeletonLoading rows={10} />
        ) : (
          <SuperAdminTable
            data={dataToDisplay}
            onNewAdminClick={setOpenModal}
            rowsPerPage={rowsPerPage}
            onRowChange={setRowsPerPage}
            onEditClicked={handleEditClicked}
            page={page}
            onPageChange={setPage}
          />
        )}
      </Box>
      <EditAdminModal
        open={openEditModal.open}
        data={openEditModal.data}
        onClose={() => setOpenEditModal({ ...openEditModal, open: false })}
      />
      <NewAdminModal open={openModal} onClose={() => setOpenModal(false)} />
    </AdminLayout>
  )
}

export default SuperAdminHomeScreen
