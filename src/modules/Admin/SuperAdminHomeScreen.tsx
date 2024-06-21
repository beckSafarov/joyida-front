'use client'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import React from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import AdminLayout from '../Shared/Admin/AdminLayout'
import Title from '@/modules/Shared/Title'
import Tag from '../Shared/Tag'

interface SuperAdminHomeScreenProps {}

interface TableRowFace {
  name: string
  phone: string
  position: string
  date: Date
}

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
    '+998957003022',
    'moderator',
    new Date('10/02/2024')
  ),
  createRowData('Toshmat Eshmatov', '+998957003022', 'superadmin', new Date()),
  createRowData('Salim Salimov', '+998957003022', 'moderator', new Date()),
  createRowData('Azim Azimov', '+998957003022', 'superadmin', new Date()),
  createRowData('Tohir Saidov', '+998957003022', 'moderator', new Date()),
]

const SuperAdminHomeScreen: React.FC<SuperAdminHomeScreenProps> = ({}) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)

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
    <AdminLayout>
      <Box mt='50px'>
        <Paper elevation={1} sx={{ p: '24px' }}>
          <Title textAlign='left' sx={{ mb: '24px' }}>
            Adminlar
          </Title>
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
                id='outlined'
                label='Qidiring'
                placeholder='Ismi, telefon raqami'
                sx={{ width: '300px' }}
                value={''}
              />
              <FormControl>
                <InputLabel size='small' id='demo-simple-select-label'>
                  Vazifasi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='demo-simple-select'
                  value={''}
                  label='Age'
                  sx={{ width: '180px' }}
                  // onChange={handleChange}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Stack>
            <Button
              variant='contained'
              size='small'
              sx={{
                height: 'fit-content',
                minWidth: '80px',
              }}
            >
              Yangi +
            </Button>
          </Stack>
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
                {rows
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
    </AdminLayout>
  )
}

export default SuperAdminHomeScreen
