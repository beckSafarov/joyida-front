'use client'
import { Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Title from '@/modules/common/Title'
import AdminLayout from '@/modules/common/AdminLayout'
import NewWorkModal from './components/NewWorkModal'
import WorkEditModal from './components/WorkEditModal'
import WorksTable from './components/WorksTable'
import { categories } from './data'
import {
  WorksDataFromServerProps,
  WorkTableDataProps,
} from '@/interfaces/Works'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchServices } from './utils'
import { ResponseProps } from '@/interfaces/common'
import { getNormalizedWorksData } from './utils'
import SkeletonLoading from '@/modules/common/SkeletonLoading'

const WorksScreen = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [activeRowId, setActiveRowId] = useState<null | number>(null)
  const [rowsPerPage, setRowsPerPage] = useState<number>(5)
  const [page, setPage] = useState<number>(0)
  const [dataToDisplay, setDataToDisplay] = useState<
    WorkTableDataProps[] | null
  >(null)

  const categoriesRes: ResponseProps = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const worksRes = useQuery({
    queryKey: ['works'],
    queryFn: () => fetchServices(page * rowsPerPage, rowsPerPage),
  })
  console.log(worksRes.data)
  const normalizeData = (
    passedData: WorksDataFromServerProps[] | null
  ): WorkTableDataProps[] | null => {
    if (!passedData) return null
    console.log(categoriesRes.data)
    const normalizedData = worksRes.data?.map?.(
      (d: WorksDataFromServerProps) =>
        getNormalizedWorksData(d, categoriesRes.data) || null
    )
    console.log(normalizedData)
    return normalizedData
  }

  const handleLoadingData = () => {
    if (worksRes?.data && !dataToDisplay) {
      setDataToDisplay(normalizeData(worksRes?.data))
    }
  }

  const handleRefreshTable = () => {
    worksRes
      .refetch()
      .then((response) => {
        setDataToDisplay(normalizeData(response.data))
      })
      .catch((error) => {
        console.error('Refetch error:', error)
      })
  }

  useEffect(() => {
    handleLoadingData()
  }, [typeof dataToDisplay, worksRes.data, categoriesRes.data])

  useEffect(() => {
    handleRefreshTable()
  }, [rowsPerPage, page])

  console.log(dataToDisplay)
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
            categories={categoriesRes?.data || categories}
            data={worksRes?.data}
            onChangeRowsPerPage={(rows: number) => setRowsPerPage(rows)}
            onChangePage={(page: number) => setPage(page)}
          />
        </Paper>
      )}
      <NewWorkModal
        categories={categoriesRes?.data || categories}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
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
