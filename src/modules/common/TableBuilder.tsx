'use client'
import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField } from '@mui/material'

type Column = {
  id: string,
  label: string,
  minWidth: number,
}
type Sort = {
  id: string,
  desc: boolean,
}
type FilterOption = {
  value: string,
  label: string,
}
type Filter = {
  id: string,
  options: FilterOption[]
}
type Button = {
  label: string,
  variant: string,
  onClick(): void,
}

type Search = {
  props: String[],
  label: String
}

type Props = {
  columns: Column[],
  rows: [],
  search: Search,
  sort: Sort[],
  filter: Filter[],
  rowsPerPage: number,
  buttons: Button[],
}

const TableBuilder = ({columns, rows, search:propsToSearch, sort:propsToSortBy, filter:propsToFilterBy, rowsPerPage:passedRowsPerPage, buttons}: Props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(passedRowsPerPage)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterTerm, setFilterTerm] = React.useState('')
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] = useState<TableRowFace[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterTerm) handleFilter()
    if (!filterTerm && !searchTerm) resetData()
  }, [searchTerm, filterTerm])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(
      rows.filter((row) => {
        for (let i = 0; i < propsToSearch.props.length; i++) {
          rgx.test(row[propsToSearch.props[i]])
          
        }
        // 
      })
    )
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterTerm('')
  }

  const handleFilter = () => {
    setSearchTerm('')
    setDataToDisplay(rows.filter((row) => row[propsToFilterBy[0].id] === filterTerm))
  }

  const handleFilterChange = (event: SelectChangeEvent) => {
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
                  Vazifasi
                </InputLabel>
                <Select
                  labelId='demo-simple-select-label'
                  size='small'
                  id='position-select'
                  value={filterTerm}
                  label='Position'
                  sx={{ width: '180px' }}
                  onChange={handleFilterChange}
                >
                  {propsToFilterBy[0].options.map((option)=>(
                    <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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
  )
}

export default TableBuilder