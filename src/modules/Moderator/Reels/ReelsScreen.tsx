'use client'
import AdminLayout from '@/modules/common/AdminLayout'
import React, { useEffect } from 'react'
import { Box } from '@mui/material'
import ReelsModal from './components/ReelsModal'
import ReelsTable from './components/ReelsTable'
import { NormalizedReelsData } from '@/interfaces/Reels'
import { useQuery } from '@tanstack/react-query'
import { fetchReels, getNormalizedReelsData } from './utils'

const ReelsScreen = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [activeRowId, setActiveRowId] = React.useState<number | null>(null)
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedReelsData[] | null
  >(null)

  const res = useQuery({
    queryKey: ['reelsData'],
    queryFn: () => fetchReels(page * rowsPerPage, rowsPerPage),
  })

  const handleResetData = () =>
    setDataToDisplay(getNormalizedReelsData(res.data))

  const handleLoadingData = () => {
    if (dataToDisplay || !res.data) return
    setDataToDisplay(getNormalizedReelsData(res.data))
  }

  useEffect(() => {
    handleLoadingData()
  }, [typeof dataToDisplay, res.data])
  return (
    <AdminLayout role='moderator' title='Videolar'>
      <Box sx={{ my: '50px' }}>
        <ReelsTable
          data={dataToDisplay}
          onDataReset={handleResetData}
          onRowClicked={setActiveRowId}
          rowsPerPage={rowsPerPage}
          onRowChange={setRowsPerPage}
          page={page}
          onPageChange={setPage}
        />
      </Box>
      <ReelsModal
        open={Boolean(activeRowId)}
        onClose={() => setActiveRowId(null)}
      />
    </AdminLayout>
  )
}

export default ReelsScreen
