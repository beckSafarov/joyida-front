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
  TextField,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import AdminLayout from '../Shared/Admin/AdminLayout'
import Tag from '@/modules/Shared/Tag'
import NewAdminModal from './components/NewAdminModal'
import { TableRowFace } from '@/modules/interfaces/AdminInterfaces'

interface SuperAdminHomeScreenProps {}


const columns = [
  { id: 'name', label: 'Admin', minWidth: 300 },
  { id: 'phone', label: 'Telefon raqami', minWidth: 250 },
  { id: 'position', label: 'Vazifasi', minWidth: 250 },
  { id: 'date', label: "Qo'shilgan sana", minWidth: 250 },
]

const createRowData = (
  name: string,
  phone: string,
  position: string,
  date: Date
) => ({ name, phone, position, date })

const rows: TableRowFace[] = [
  createRowData(
    'Karim Zaripov',
    '+998908871265',
    'moderator',
    new Date('10/02/2024')
  ),
  createRowData('Toshmat Eshmatov', '+998957003022', 'superadmin', new Date()),
  createRowData('Salim Salimov', '+998953641987', 'moderator', new Date()),
  createRowData('Azim Azimov', '+998991234567', 'superadmin', new Date()),
  createRowData('Tohir Saidov', '+998947768789', 'moderator', new Date()),
]

const SuperAdminHomeScreen: React.FC<SuperAdminHomeScreenProps> = ({}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterPosition, setFilterPosition] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] = useState<TableRowFace[]>(rows)

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
    setDataToDisplay(rows.filter((row) => row.position === filterPosition))
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilterPosition(event.target.value)
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
    <AdminLayout title='Adminlar'>
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
                  Vazifasi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='position-select'
                  value={filterPosition}
                  label='Position'
                  sx={{ width: '180px' }}
                  onChange={handleSelectChange}
                >
                  <MenuItem value={'moderator'}>Moderator</MenuItem>
                  <MenuItem value={'superadmin'}>Superadmin</MenuItem>
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
          {filterPosition && (
            <Tag onClear={() => setFilterPosition('')}>{filterPosition} </Tag>
          )}
          <center>
            <TableContainer aria-label='sticky table'>
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
                  .map((row: TableRowFace, index: number) => (
                    <TableRow component='div' hover key={index}>
                      {columns.map((column) => {
                        let value = row[column?.id as keyof TableRowFace]
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
      <NewAdminModal open={openModal} onClose={() => setOpenModal(false)} />
    </AdminLayout>
  )
}

export default SuperAdminHomeScreen
