'use client'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Skeleton,
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
  DataFromServerProps,
  FilterOption,
  NormalizedUserDataProps,
  SelectFilterOption,
  UsersTableDataToDisplay,
} from '@/interfaces/Users'
import usersData, { filterOptions, usersTableColumns } from '@/data/usersData'
import UserInfoModal from './components/UserInfoModal'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import { getNormalizedUserData } from './utils'
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
    NormalizedUserDataProps[] | null
  >(null)
  const {
    isLoading,
    error,
    data: dataFromServer,
  } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () => {
      const response = await axios.get(
        'https://account.joida.uz/auth/user/list',
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE1NTc4NzYsInVzZXJfaWQiOjV9.KfttYkCXYpedu74r8wEpR2j6XYznHfp_ynyQ5hAGFG8`,
          },
        }
      )
      return response.data
    },
  })

  useEffect(() => {
    if (typeof dataToDisplay === null) setRefinedData()
    if (!searchTerm) resetData()
    if (!filter.name && !searchTerm) resetData()
    if (dataFromServer) setRefinedData()
  }, [typeof dataToDisplay, searchTerm, filter.name, dataFromServer])

  console.log({ isLoading, error, dataFromServer })

  const setRefinedData = () => {
    setDataToDisplay(
      dataFromServer?.map(
        (data: DataFromServerProps) => getNormalizedUserData(data) || []
      )
    )
  }

  const resetData = setRefinedData

  const handleSearch = () => {
    if (!dataToDisplay) return []
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(
      dataToDisplay?.filter(({ first_name, last_name, phone }) => {
        return rgx.test(first_name) || rgx.test(last_name) || rgx.test(phone)
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
          data[filter.name as keyof NormalizedUserDataProps] ===
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
        {isLoading ? (
          <>
            {Array(10)
              .fill(0)
              .map((i) => (
                <Skeleton height={30} key={i} animation='wave' variant='text' />
              ))}
          </>
        ) : (
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
                        .map((row: NormalizedUserDataProps, index: number) => (
                          <TableRow
                            onClick={() => setOpenModal(true)}
                            component='div'
                            hover
                            key={index}
                          >
                            {columns.map((column) => {
                              let value =
                                row[
                                  column?.id as keyof NormalizedUserDataProps
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
                                        typeof value === 'string'
                                          ? value.match(/erkak|biznes/gi)
                                            ? 'primary'
                                            : 'secondary'
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
        )}
      </Box>
      <UserInfoModal open={openModal} onClose={() => setOpenModal(false)} />
    </AdminLayout>
  )
}

export default UsersScreen
