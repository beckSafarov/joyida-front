'use client'
import {
  Box,
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
import React, { useEffect } from 'react'
import AdminLayout from '@/modules/common/AdminLayout'
import Tag from '@/modules/common/Tag'
import {
  FilterOption,
  SelectFilterOption,
  UsersTableDataToDisplay,
} from '@/interfaces/Users'
import usersData, { filterOptions, usersTableColumns } from '@/data/usersData'
import { formatDate } from '@/utils/dateUtils'
const columns = usersTableColumns
const rows = usersData

const UsersScreen = () => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filter, setFilter] = React.useState<SelectFilterOption>({
    name: '',
    label: '',
    options: [],
    selectedSuboption: { label: '', id: null },
  })
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] = React.useState<
    UsersTableDataToDisplay[] | null
  >(null)

  useEffect(() => {
    if (typeof dataToDisplay === null) setRefinedData()
    if (!searchTerm) resetData()
    if (!filter.name && !searchTerm) resetData()
  }, [typeof dataToDisplay, searchTerm, filter.name])

  const setRefinedData = () => {
    setDataToDisplay(
      rows.map((currData) => ({
        ...currData,
        date: formatDate(currData.date),
        isBusiness: currData.isBusiness ? 'Biznes' : 'Oddiy',
        gender: currData.gender === 'male' ? 'erkak' : 'ayol',
      }))
    )
  }

  const resetData = setRefinedData

  const handleSearch = () => {
    if (!dataToDisplay) return []
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(
      dataToDisplay?.filter(({ name, phone, jobTitle }) => {
        return rgx.test(jobTitle || '') || rgx.test(name) || rgx.test(phone)
      })
    )
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    handleSearch()
  }

  const handleFilter = (newFilter: SelectFilterOption) => {
    if (!dataToDisplay) return
    setDataToDisplay(
      dataToDisplay.filter(
        (data) =>
          data[filter.name as keyof UsersTableDataToDisplay] ===
          newFilter.selectedSuboption.label
      )
    )
  }

  const handleSelectOption = ({ target: { value } }: SelectChangeEvent) => {
    setFilter({
      ...filter,
      ...filterOptions.find((option) => option.name === value),
    })
  }
  const handleSelectSubOption = ({ target: { value } }: SelectChangeEvent) => {
    console.log({ options: filter.options, value })
    const newFilter = {
      ...filter,
      selectedSuboption:
        filter.options.find((option) => option?.id === Number(value)) ||
        filter.selectedSuboption,
    }
    setFilter(newFilter)
    console.log({ dataToDisplay, newFilter })
    handleFilter(newFilter)
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
    <AdminLayout role='moderator' title='Foydalanuvchilar'>
      <Box mt='50px'>
        <Paper elevation={1} sx={{ p: '24px' }}>
          <Stack pb='16px' direction='row' justifyContent={'space-between'}>
            <Stack
              width='100%'
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
                  value={filter.name}
                  label='Filter'
                  sx={{ width: '180px' }}
                  onChange={handleSelectOption}
                >
                  {filterOptions.map((option: FilterOption) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel size='small' id='demo-simple-select-label'>
                  Keyingi tanlov
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='city-select'
                  value={String(filter.selectedSuboption.id)}
                  label='City'
                  sx={{ width: '180px' }}
                  onChange={handleSelectSubOption}
                >
                  {filter.options.map((option, i: number) => (
                    <MenuItem key={i} value={option.id || ''}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Stack>
          {filter.selectedSuboption.id !== null && (
            <Tag
              onClear={() =>
                setFilter({
                  ...filter,
                  selectedSuboption: { label: '', id: null },
                })
              }
            >
              {filter.selectedSuboption.label}
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
                  {dataToDisplay &&
                    dataToDisplay
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row: UsersTableDataToDisplay, index: number) => (
                        <TableRow component='div' hover key={index}>
                          {columns.map((column) => {
                            let value =
                              row[
                                column?.id as keyof UsersTableDataToDisplay
                              ] || '-'
                            value = typeof value === 'object' ? '-' : value
                            return (
                              <TableCell
                                style={{
                                  minWidth: column.minWidth,
                                  cursor: 'pointer',
                                }}
                                key={column.id}
                              >
                                {column.id.match(/gender|isBusiness/) ? (
                                  <Tag
                                    variant={
                                      value.match(/erkak|biznes/gi)
                                        ? 'primary'
                                        : 'secondary'
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
