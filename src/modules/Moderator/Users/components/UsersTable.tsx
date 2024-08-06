'use client'
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
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
import usersData, { filterOptions, usersTableColumns } from '@/data/usersData'
import {
  FilterOption,
  NormalizedUserDataProps,
  SelectFilterOption,
} from '@/interfaces/Users'
import Tag from '@/modules/common/Tag'
const columns = usersTableColumns
const rows = usersData

type Props = {
  data: NormalizedUserDataProps[] | null
  onDataReset(): void
  onInfoRequest(id: number): void
}

const UsersTable = (props: Props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filter, setFilter] = React.useState<SelectFilterOption>({
    name: '',
    label: '',
    options: [],
    selectedSuboption: { label: '', id: null },
  })
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedUserDataProps[] | null
  >(null)

  useEffect(() => {
    if (!searchTerm) resetData()
    if (!filter.name && !searchTerm) resetData()
    if (props.data) setDataToDisplay(props.data)
  }, [searchTerm, filter.name, props.data])

  const resetData = () => setDataToDisplay(props.data)

  const handleClearFilter = () => {
    setFilter({
      ...filter,
      selectedSuboption: { label: '', id: null },
    })
    resetData()
  }

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
        (d) =>
          d[filter.name as keyof NormalizedUserDataProps] ===
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
    const newFilter = {
      ...filter,
      selectedSuboption:
        filter.options.find((option) => option?.id === Number(value)) ||
        filter.selectedSuboption,
    }
    setFilter(newFilter)
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
    <>
      <Stack pb='16px' direction='row' justifyContent={'space-between'}>
        <Stack width='100%' direction='row' spacing={4} alignItems={'center'}>
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
        <Tag onClear={handleClearFilter}>{filter.selectedSuboption.label}</Tag>
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
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: NormalizedUserDataProps, index: number) => (
                    <TableRow
                      onClick={() => props.onInfoRequest(1)}
                      component='div'
                      hover
                      key={index}
                    >
                      {columns.map((column) => {
                        let value =
                          row[column?.id as keyof NormalizedUserDataProps] ||
                          '-'
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
    </>
  )
}

export default UsersTable
