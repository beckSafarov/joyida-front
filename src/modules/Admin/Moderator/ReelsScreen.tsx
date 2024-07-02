'use client'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import { createColumnData } from '@/utils'
import React, { useEffect } from 'react'
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
import Title from '@/modules/Shared/Title'
import Tag from '@/modules/Shared/Tag'
import {
  ModeratorWorkRow,
  ReelsProps,
} from '@/modules/interfaces/AdminInterfaces'
import NewWorkModal from '../components/NewWorkModal'
import WorkEditModal from '../components/WorkEditModal'
import Image from 'next/image'
import { green } from '@mui/material/colors'

type Props = {}

const columns = [
  createColumnData('thumbnail', 'Video Rasmi', 200),
  createColumnData('title', 'Sarlavha', 150),
  createColumnData('date', 'Yaratilgan sana', 150),
  createColumnData('views', "Ko'rilgan", 100),
  createColumnData('status', 'Holati', 150),
]

const createRow = (
  id: string,
  thumbnail: string,
  title: string,
  date: Date,
  views: number,
  status: boolean
) => ({ id, thumbnail, title, date, views, status })

const rows = [
  createRow(
    '1',
    '/images/working.jpg',
    'Mening ish kunim',
    new Date(),
    10,
    false
  ),
  createRow(
    '2',
    '/images/working.jpg',
    "Professional ta'mirlash",
    new Date(),
    10,
    true
  ),
  createRow(
    '3',
    '/images/working.jpg',
    "Go'zal soch turmaklari",
    new Date(),
    10,
    false
  ),
  createRow(
    '4',
    '/images/working.jpg',
    'Eng ishonchli tanlov',
    new Date(),
    10,
    false
  ),
  createRow(
    '5',
    '/images/working.jpg',
    "Qanday qilib eng zo'r",
    new Date(),
    10,
    false
  ),
]

const statusOptions = [
  { label: 'Tasdiqlanmadi', id: '0' },
  { label: 'Tasdiqlandi', id: '1' },
]

const ReelsScreen = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterTerm, setFilterTerm] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [activeRowId, setActiveRowId] = React.useState<string>('')
  const [dataToDisplay, setDataToDisplay] = React.useState<ReelsProps[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterTerm) handleFilter()
    if (!filterTerm && !searchTerm) resetData()
  }, [searchTerm, filterTerm])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(rows.filter((row) => rgx.test(row.title)))
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterTerm('')
  }

  const handleFilter = () => {
    setSearchTerm('')
    console.log(filterTerm)
    setDataToDisplay(
      rows.filter((row) => Number(row.status) === Number(filterTerm))
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
    <AdminLayout role='moderator' title='Videolar'>
      <Box sx={{ my: '50px' }}>
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
                placeholder='Sarlavhasi'
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
                  {statusOptions.map((option, i: number) => (
                    <MenuItem key={i} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {filterTerm && (
            <Tag
              onClear={() => setFilterTerm('')}
              variant={filterTerm === '1' ? 'primary' : 'secondary'}
            >
              {filterTerm == '1' ? 'Tasdiqlandi' : 'Tasdiqlanmadi'}{' '}
            </Tag>
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
                    .map((row: ReelsProps, index: number) => (
                      <TableRow
                        onClick={() => setActiveRowId(row.id)}
                        component='div'
                        hover
                        key={index}
                      >
                        {columns.map((column) => {
                          let value = row[column?.id as keyof ReelsProps]
                          value =
                            column.id === 'date'
                              ? value.toLocaleString()
                              : value
                          return (
                            <TableCell
                              style={{
                                minWidth: column.minWidth,
                                cursor: 'pointer',
                              }}
                              key={column.id}
                            >
                              {column.id === 'status' ? (
                                <Tag
                                  variant={
                                    row.status === true
                                      ? 'primary'
                                      : 'secondary'
                                  }
                                >
                                  {
                                    statusOptions.find(
                                      (option) => option.id == value
                                    )?.label
                                  }
                                </Tag>
                              ) : column.id === 'thumbnail' ? (
                                <Image
                                  width={70}
                                  height={70}
                                  src={value.toLocaleString()}
                                  alt='thumbnail'
                                />
                              ) : (
                                value.toLocaleString()
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
      </Box>
    </AdminLayout>
  )
}

export default ReelsScreen
