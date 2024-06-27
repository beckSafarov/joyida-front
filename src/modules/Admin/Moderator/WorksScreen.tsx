'use client'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import Title from '@/modules/Shared/Title'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import Tag from '@/modules/Shared/Tag'
import { ModeratorWorkRow } from '@/modules/interfaces/AdminInterfaces'
import NewWorkModal from '../components/NewWorkModal'
import { createColumnData } from '@/utils'
import WorkEditModal from '../components/WorkEditModal'

const columns = [
  createColumnData('id', 'ID', 250),
  createColumnData('name', 'Ish nomi', 250),
  createColumnData('category', 'Kategoriyasi', 250),
]

const rows = [
  {
    id: '34567',
    name: 'Lorem Ipsum',
    category: 'Texnik Ishlar',
    categoryId: '12345',
  },
  {
    id: '34568',
    name: 'Lorem Ipsum',
    category: 'IT va Kompyuter xizmatlari',
    categoryId: '12355',
  },
  {
    id: '34569',
    name: 'Lorem Ipsum',
    category: "Go'zallik va hayot",
    categoryId: '12346',
  },
  {
    id: '34570',
    name: 'Lorem Ipsum',
    category: "Sport va sog'lomlashtirish",
    categoryId: '12347',
  },
  {
    id: '34571',
    name: 'Lorem Ipsum',
    category: 'Texnik Ishlar',
    categoryId: '12345',
  },
]

const categories = [
  { label: 'Texnik Ishlar', categoryId: '12345' },
  { label: "Sport va sog'lomlashtirish", categoryId: '12347' },
  { label: "Go'zallik va hayot", categoryId: '12346' },
  { label: 'IT va Kompyuter xizmatlari', categoryId: '12355' },
]

const defaultActiveRowValues = {
  workId: '',
  intialValues: {
    name: '',
    categoryId: '',
  },
}

const WorksScreen = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterTerm, setFilterTerm] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [activeRowId, setActiveRowId] = useState<string>('')
  const [dataToDisplay, setDataToDisplay] =
    React.useState<ModeratorWorkRow[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterTerm) handleFilter()
    if (!filterTerm && !searchTerm) resetData()
  }, [searchTerm, filterTerm])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(rows.filter((row) => rgx.test(row.name)))
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterTerm('')
  }

  const handleFilter = () => {
    setSearchTerm('')
    setDataToDisplay(
      rows.filter((row) => row.categoryId === filterTerm && row.category)
    )
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilterTerm(event.target.value)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  return (
    <AdminLayout role='moderator'>
      <Title textAlign='left' sx={{ mb: '20px' }}>
        Ishlar
      </Title>
      <Paper elevation={1} sx={{ p: '24px' }}>
        <Stack pb='16px' direction='row' justifyContent={'space-between'}>
          <Stack
            width='100%'
            // sx={{ bgcolor: 'blue' }}
            direction='row'
            spacing={4}
            alignItems={'center'}
          >
            <TextField
              variant='outlined'
              size='small'
              id='search-field'
              label='Qidiring'
              placeholder='Ismi, telefon raqami'
              sx={{ width: '300px' }}
              value={searchTerm}
              onChange={handleSearchTermChange}
            />
            <FormControl>
              <InputLabel size='small' id='demo-simple-select-label'>
                Kategoriyasi
              </InputLabel>
              <Select
                labelId='demo-simple-select-label'
                size='small'
                id='position-select'
                value={filterTerm}
                label='Category'
                sx={{ width: '180px' }}
                onChange={handleSelectChange}
              >
                {categories.map((option, i: number) => (
                  <MenuItem key={i} value={option.categoryId}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
          <Button
            variant='contained'
            size='small'
            onClick={() => setOpenModal(true)}
            sx={{
              height: 'fit-content',
              minWidth: '80px',
            }}
          >
            Yangi +
          </Button>
        </Stack>
        {filterTerm && (
          <Tag onClear={() => setFilterTerm('')}>{filterTerm} </Tag>
        )}
        <center>
          <TableContainer aria-label='sticky table'>
            <Table>
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      style={{ minWidth: column.minWidth }}
                      key={column.id}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {dataToDisplay
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: ModeratorWorkRow, index: number) => (
                    <TableRow
                      onClick={() => setActiveRowId(row.id)}
                      component='div'
                      hover
                      key={index}
                    >
                      {columns.map((column) => {
                        let value = row[column?.id as keyof ModeratorWorkRow]
                        return (
                          <TableCell
                            style={{
                              minWidth: column.minWidth,
                              cursor: 'pointer',
                            }}
                            key={column.id}
                          >
                            {column.id === 'category' ? (
                              <Tag>{value}</Tag>
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component='div'
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </center>
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
        onClose={() => setActiveRowId('')}
      />
    </AdminLayout>
  )
}

export default WorksScreen
