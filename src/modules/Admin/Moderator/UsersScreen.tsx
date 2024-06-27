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
import React, { useCallback, useEffect } from 'react'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import Tag from '@/modules/Shared/Tag'
import { createColumnData } from '@/utils'
import { UsersTableRowProps } from '@/modules/interfaces/AdminInterfaces'
import locations, { LocationType } from '@/modules/data/locations'

const columns = [
  createColumnData('name', 'Foydalanuvchi', 200),
  createColumnData('phone', 'Telefon raqami', 200),
  createColumnData('address', 'Manzili', 200),
  createColumnData('feedbacks', 'Fidbeklar', 100),
  createColumnData('date', "Qo'shilgan sana", 200),
]

const createRowData = (
  name: string,
  phone: string,
  address: string,
  feedback: number,
  date: Date
) => ({ name, phone, address, feedback, date })

const rows = [
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('11/02/2024')
  ),
  createRowData(
    'Xamza Rahmatov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('10/02/2024')
  ),
  createRowData(
    'Ibrohim Qosimov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('12/02/2024')
  ),
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('13/02/2024')
  ),
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('14/02/2024')
  ),
]

type FilterByTypes = string | ''

type FilterType = {
  by: string | ''
  option?: string
}

const statusOptions = [
  { label: 'Aktiv', id: 'active' },
  { label: 'Passiv', id: 'passive' },
]

const UsersScreen = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filter, setFilter] = React.useState<FilterType>({ by: '' })
  const [filterBy, setFilterBy] = React.useState<FilterByTypes>('')
  const [filterPosition, setFilterPosition] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] =
    React.useState<UsersTableRowProps[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterPosition) handleFilter()
    if (!filterPosition && !searchTerm) resetData()
  }, [searchTerm, filterPosition])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(
      rows.filter((row) => rgx.test(row.name) || rgx.test(row.phone))
    )
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterPosition('')
  }

  const handleFilter = () => {
    setSearchTerm('')
    // setDataToDisplay(rows.filter((row) => row.position === filterPosition))
  }

  const handleSelectChange = (event: SelectChangeEvent, prop: string) => {
    setFilter({ ...filter, [prop]: event.target.value })
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

  const getOptionsByFilter = useCallback(() => {
    return filter.by === 'address' ? locations : statusOptions
  }, [filter.by])

  const getLocNameById = (locId: number) => {
    return locations.find((myLoc: LocationType) => myLoc?.id === locId)?.label
  }

  return (
    <AdminLayout role='moderator' title='Foydalanuvchilar'>
      <Box mt='50px'>
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
                  Filtr turi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='filter-select'
                  value={filter.by}
                  label='Filter'
                  sx={{ width: '180px' }}
                  onChange={(e) => handleSelectChange(e, 'by')}
                >
                  <MenuItem value={'address'}>Manzil</MenuItem>
                  <MenuItem value={'status'}>Status</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel size='small' id='demo-simple-select-label'>
                  {filter.by === 'address' ? 'Shahar yoki Viloyat' : 'Status'}
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='city-select'
                  value={filter?.option}
                  label='City'
                  sx={{ width: '180px' }}
                  onChange={(e) => handleSelectChange(e, 'option')}
                >
                  {getOptionsByFilter().map((option, i: number) => (
                    <MenuItem key={i} value={option.id}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {filter?.option && (
            <Tag onClear={() => setFilter({ ...filter, option: '' })}>
              {getLocNameById(+filter.option)}
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
                    .map((row: UsersTableRowProps, index: number) => (
                      <TableRow component='div' hover key={index}>
                        {columns.map((column) => {
                          let value =
                            row[column?.id as keyof UsersTableRowProps]
                          value =
                            typeof value === 'object' ? String(value) : value
                          return (
                            <TableCell
                              style={{
                                minWidth: column.minWidth,
                                cursor: 'pointer',
                              }}
                              key={column.id}
                            >
                              {column.id === 'position' ? (
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
      </Box>
    </AdminLayout>
  )
}

export default UsersScreen
