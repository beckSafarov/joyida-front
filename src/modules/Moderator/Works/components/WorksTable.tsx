'use client'
import {
  Button,
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
import Tag from '@/modules/common/Tag'
import {
  categoryFromServerProps,
  ModeratorWorkRow,
  WorkTableDataProps,
} from '@/interfaces/Works'
import { createColumnData } from '@/utils'

const columns = [
  createColumnData('id', 'ID', 250),
  createColumnData('name', 'Ish nomi', 250),
  createColumnData('category', 'Kategoriyasi', 250),
]

type WorksTableProps = {
  onNewWorkClicked(status: boolean): void
  onInfoRequest(id: number): void
  categories: categoryFromServerProps[]
  data: WorkTableDataProps[]
}

const WorksTable = ({
  onNewWorkClicked,
  onInfoRequest,
  categories,
  data: rows,
}: WorksTableProps) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterTerm, setFilterTerm] = React.useState<number | null>(null)
  const [dataToDisplay, setDataToDisplay] =
    React.useState<WorkTableDataProps[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterTerm) handleFilter()
    if (!filterTerm && !searchTerm) {
      resetData()
    }
  }, [searchTerm, filterTerm, dataToDisplay.length])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(
      rows.filter((row) => rgx.test(row.name) || rgx.test(row.id.toString()))
    )
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterTerm(null)
  }

  const handleFilter = () => {
    setSearchTerm('')
    setDataToDisplay(
      rows.filter((row) => row.categoryId === filterTerm && row.category)
    )
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
    setFilterTerm(Number(event.target.value))
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

  const getLabelById = (id: number) => {
    return categories.find((category) => category.id === id)?.name
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
            placeholder='Id, nomi'
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
              placeholder='Hammasi'
              id='position-select'
              value={String(filterTerm)}
              label='Category'
              sx={{ width: '180px' }}
              onChange={handleSelectChange}
            >
              {categories.map((option, i: number) => (
                <MenuItem key={i} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Button
          variant='contained'
          size='small'
          onClick={() => onNewWorkClicked(true)}
          sx={{
            height: 'fit-content',
            minWidth: '80px',
          }}
        >
          Yangi +
        </Button>
      </Stack>
      {filterTerm && (
        <Tag onClear={() => setFilterTerm(null)}>
          {getLabelById(filterTerm)}{' '}
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
                .map((row: WorkTableDataProps, index: number) => (
                  <TableRow
                    onClick={() => onInfoRequest(row.id)}
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
    </>
  )
}

export default WorksTable
