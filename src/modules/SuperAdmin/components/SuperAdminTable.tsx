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
import Tag from '@/modules/common/Tag'
import { NormalizedAdminProps } from '@/interfaces/superadmin'

interface SuperAdminTableProps {
  data: NormalizedAdminProps[] | []
  onNewAdminClick(open: boolean): void
  rowsPerPage: number
  onRowChange(row: number): void
  page: number
  onPageChange(page: number): void
  onEditClicked(data: NormalizedAdminProps): void
}

const columns = [
  { id: 'name', label: 'Admin', minWidth: 300 },
  { id: 'phone', label: 'Telefon raqami', minWidth: 250 },
  { id: 'position', label: 'Vazifasi', minWidth: 250 },
  { id: 'created_at', label: "Qo'shilgan sana", minWidth: 250 },
]

const SuperAdminTable: React.FC<SuperAdminTableProps> = ({
  onNewAdminClick,
  onPageChange,
  onRowChange,
  onEditClicked,
  page,
  rowsPerPage,
  data: rows,
}) => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterPosition, setFilterPosition] = React.useState('')
  const [dataToDisplay, setDataToDisplay] = useState<
    NormalizedAdminProps[] | []
  >([])

  useEffect(() => {
    if (rows) setDataToDisplay(rows)
    if (searchTerm) handleSearch()
    if (filterPosition) handleFilter()
    if (!filterPosition && !searchTerm) resetData()
  }, [searchTerm, filterPosition, rows])

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
    onPageChange(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onRowChange(+event.target.value)
    onPageChange(0)
  }

  return (
    <>
      <Box mt='100px'>
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
              onClick={() => onNewAdminClick(true)}
              sx={{
                height: 'fit-content',
                minWidth: '80px',
              }}
            >
              Yangi +
            </Button>
          </Stack>
          {filterPosition && (
            <Tag
              variant={filterPosition === 'moderator' ? 'secondary' : 'primary'}
              onClear={() => setFilterPosition('')}
            >
              {filterPosition}{' '}
            </Tag>
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
                {dataToDisplay.map(
                  (row: NormalizedAdminProps, index: number) => (
                    <TableRow
                      onClick={() => onEditClicked(row)}
                      component='div'
                      hover
                      key={index}
                    >
                      {columns.map((column) => {
                        let value =
                          row[column?.id as keyof NormalizedAdminProps]
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
                              <Tag
                                variant={
                                  row.position === 'moderator'
                                    ? 'secondary'
                                    : 'primary'
                                }
                              >
                                {value}
                              </Tag>
                            ) : (
                              value
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                )}
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
    </>
  )
}

export default SuperAdminTable
