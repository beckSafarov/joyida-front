'use client'
import { Paper } from '@mui/material'
import React, { useState } from 'react'
import Title from '@/modules/common/Title'
import AdminLayout from '@/modules/common/AdminLayout'
import NewWorkModal from './components/NewWorkModal'
import WorkEditModal from './components/WorkEditModal'
import WorksTable from './components/WorksTable'
import { categories } from './data'

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

  return (
    <AdminLayout role='moderator'>
      <Title textAlign='left' sx={{ mb: '20px' }}>
        Ishlar
      </Title>
      <Paper elevation={1} sx={{ p: '24px' }}>
        <WorksTable
          onNewWorkClicked={setOpenModal}
          onInfoRequest={setActiveRowId}
          categories={categories}
          data={rows}
        />
      </Paper>
      <NewWorkModal
        categories={categories}
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
