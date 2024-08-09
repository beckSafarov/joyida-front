'use client'
import { Paper } from '@mui/material'
import React, { useEffect, useMemo, useState } from 'react'
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
import { getDataFromLCS, storeDataToLCS } from '@/utils/lcsUtils'
import { useQuery } from '@tanstack/react-query'
import { fetchCategories, fetchServices } from './utils'
import { ResponseProps } from '@/interfaces/common'
import { getNormalizedWorksData } from './utils'
import SkeletonLoading from '@/modules/common/SkeletonLoading'

const rows = [
  {
    id: 34567,
    name: 'Lorem Ipsum',
    category: 'Texnik Ishlar',
    categoryId: 1,
  },
  {
    id: 34568,
    name: 'Lorem Ipsum',
    category: 'IT va Kompyuter xizmatlari',
    categoryId: 2,
  },
  {
    id: 34569,
    name: 'Lorem Ipsum',
    category: 'Go&apos;zallik va hayot',
    categoryId: 3,
  },
  {
    id: 34570,
    name: 'Lorem Ipsum',
    category: "Sport va sog'lomlashtirish",
    categoryId: 4,
  },
  {
    id: 34571,
    name: 'Lorem Ipsum',
    category: 'Texnik Ishlar',
    categoryId: 1,
  },
]

const WorksScreen = () => {
  const [openModal, setOpenModal] = React.useState(false)
  const [activeRowId, setActiveRowId] = useState<null | number>(null)
  const [dataToDisplay, setDataToDisplay] = useState<WorkTableDataProps | null>(
    null
  )
  const worksFromLC = useMemo(() => getDataFromLCS('works'), [])
  const categoriesFromLC = useMemo(() => getDataFromLCS('categories'), [])
  const workResFromLC = { isLoading: false, error: null, data: worksFromLC }
  const categoriesResFromLC = {
    isLoading: false,
    error: null,
    data: categoriesFromLC,
  }

  const worksRes: ResponseProps = worksFromLC
    ? workResFromLC
    : useQuery({
        queryKey: ['works'],
        queryFn: fetchServices,
      })
  const categoriesRes: ResponseProps = categoriesFromLC
  // ? categoriesResFromLC
  // : useQuery({
  //     queryKey: ['categories'],
  //     queryFn: fetchCategories,
  //   })

  // if (worksRes.data || categoriesRes.data)
  const loadFromLC = () => setDataToDisplay(worksFromLC)
  const normalizeWorksData = () => {
    return worksRes?.data?.map?.((d: WorksDataFromServerProps) =>
      getNormalizedWorksData(d, categoriesRes?.data || categoriesFromLC)
    )
  }

  const setNormalizedWorksData = () => {
    setDataToDisplay(normalizeWorksData())
  }

  const backupWorksDataToLC = () => {
    storeDataToLCS('works', normalizeWorksData())
  }
  const backupCategoriesDataToLC = () => {
    storeDataToLCS('categories', categoriesRes?.data)
  }

  const handleLoadingData = () => {
    if (!dataToDisplay && worksFromLC) loadFromLC()
    if (worksRes?.data && !dataToDisplay && !worksFromLC) {
      setNormalizedWorksData()
      backupWorksDataToLC()
    }
    if (categoriesRes?.data && !categoriesFromLC) backupCategoriesDataToLC()
  }

  useEffect(() => {
    handleLoadingData()
  }, [typeof dataToDisplay, worksRes?.data, categoriesRes?.data])

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
            categories={categoriesRes?.data || categories}
            data={worksRes?.data}
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
