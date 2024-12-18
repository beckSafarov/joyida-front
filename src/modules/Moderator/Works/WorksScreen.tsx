'use client'
import { Paper } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
import Title from '@/modules/common/Title'
import AdminLayout from '@/modules/common/AdminLayout'
import NewWorkModal from './components/NewWorkModal'
import WorkEditModal from './components/WorkEditModal'
import WorksTable from './components/WorksTable'
import { useQuery } from '@tanstack/react-query'
import { fetchServices, getCategoriesFromWorks } from './utils'
import SkeletonLoading from '@/modules/common/SkeletonLoading'

const WorksScreen = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [activeRowId, setActiveRowId] = useState<null | number>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)

  const worksRes = useQuery({
    queryKey: ['works'],
    queryFn: () => fetchServices(page * rowsPerPage, rowsPerPage),
  })
  const works = worksRes?.data?.services
  const handleRefreshTable = () => worksRes.refetch()

  useEffect(() => {
    handleRefreshTable()
  }, [rowsPerPage, page])

  const categories = useMemo(() => {
    if (!works) return []
    return getCategoriesFromWorks(works)
  }, [works])

  return (
    <AdminLayout role='moderator'>
      <Title textAlign='left' sx={{ mb: '20px' }}>
        Ishlar
      </Title>
      {worksRes.isLoading ? (
        <SkeletonLoading rows={10} />
      ) : (
        <Paper elevation={1} sx={{ p: '24px' }}>
          <WorksTable
            onNewWorkClicked={setOpenModal}
            onInfoRequest={setActiveRowId}
            onRefreshTable={handleRefreshTable}
            categories={categories}
            data={works}
            onChangeRowsPerPage={(rows: number) => setRowsPerPage(rows)}
            onChangePage={(page: number) => setPage(page)}
            totalServices={worksRes?.data?.total_count || rowsPerPage}
          />
        </Paper>
      )}
      <NewWorkModal open={openModal} onClose={() => setOpenModal(false)} />
      <WorkEditModal
        workId={activeRowId}
        open={!!activeRowId}
        categories={categories}
        onClose={() => setActiveRowId(null)}
      />
    </AdminLayout>
  )
}

export default WorksScreen
