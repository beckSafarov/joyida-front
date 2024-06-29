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
  TextField,
} from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import Tag from '@/modules/Shared/Tag'
import { AdTableRowDataProps } from '@/modules/interfaces/AdminInterfaces'
import { createColumnData } from '@/utils'
import { FilterByTypes, FilterType } from '@/modules/types'
import locations, { LocationType } from '@/modules/data/locations'
import categories, { CategoryProps } from '@/modules/data/categories'
import Link from 'next/link'

type Props = {}

const columns = [
  createColumnData('name', 'Nomi', 200),
  createColumnData('location', 'Joylashuvi', 200),
  createColumnData('category', 'Reklama Kategoriyasi', 200),
  createColumnData('beginningDate', 'Reklama boshlanishi', 200),
  createColumnData('endingDate', 'Reklama tugashi', 200),
]

const createAdRow = (
  name: string,
  location: string,
  category: string,
  beginningDate: Date,
  endingDate: Date
) => ({ name, location, category, beginningDate, endingDate })

const rows = [
  createAdRow(
    'KFC Uchtepa',
    'IzaiahPort',
    'Restoranlar',
    new Date('06/01/2024'),
    new Date('06/15/2024')
  ),
  createAdRow(
    'Bro Barbershop',
    'IzaiahPort',
    "Go'zallik",
    new Date('06/01/2024'),
    new Date('06/15/2024')
  ),
  createAdRow(
    'SAMO Collections',
    'IzaiahPort',
    'Salomatlik',
    new Date('06/01/2024'),
    new Date('06/15/2024')
  ),
  createAdRow(
    'PDP University',
    'IzaiahPort',
    'Hayot mamot',
    new Date('06/01/2024'),
    new Date('06/15/2024')
  ),
  createAdRow(
    'Kira company',
    'IzaiahPort',
    'Texnik ishlar',
    new Date('06/01/2024'),
    new Date('06/15/2024')
  ),
]

const AdsScreen = (props: Props) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filter, setFilter] = React.useState<FilterType>({ by: '', option: '' })
  const [openModal, setOpenModal] = React.useState(false)
  const [dataToDisplay, setDataToDisplay] =
    React.useState<AdTableRowDataProps[]>(rows)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filter.option) handleFilter()
    if (!filter.option && !searchTerm) resetData()
  }, [searchTerm, filter.option])

  const resetData = () => setDataToDisplay(rows)

  const handleSearch = () => {
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(rows.filter((row) => rgx.test(row.name)))
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
  }

  const handleFilter = () => {
    setSearchTerm('')
    setDataToDisplay((data) =>
      data.filter(
        (single) =>
          single.category ===
          categories.find(
            (category: CategoryProps) => category.id === +filter.option
          )?.label
      )
    )
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
    return filter.by === 'address' ? locations : categories
  }, [filter.by])

  const getLabelByPropId = (locId: number) => {
    return filter.by === 'address'
      ? locations.find((myLoc: LocationType) => myLoc?.id === locId)?.label
      : categories.find((category: CategoryProps) => category?.id === locId)
          ?.label
  }

  return (
    <AdminLayout role='moderator' title='Reklamalar'>
      <Box my='50px'>
        <Paper elevation={1} sx={{ p: '24px' }}>
          <Stack pb='16px' direction='row'>
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
                  value={filter.by}
                  label='Filter'
                  sx={{ width: '180px' }}
                  onChange={(e) => handleSelectChange(e, 'by')}
                >
                  <MenuItem value={'address'}>Manzil</MenuItem>
                  <MenuItem value={'category'}>Kategoriya</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel size='small' id='demo-simple-select-label'>
                  {filter.by === 'address'
                    ? 'Shahar yoki Viloyat'
                    : 'Kategoriya'}
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
              <Link href='/admin/moderator/ads/create'>
                <Button
                  type='button'
                  variant='contained'
                  size='small'
                  sx={{ width: 'fit-content', height: 'fit-content' }}
                >
                  Yangi
                </Button>
              </Link>
            </Stack>
          </Stack>
          {filter?.option && (
            <Tag onClear={() => setFilter({ ...filter, option: '' })}>
              {getLabelByPropId(+filter.option)}
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
                    .map((row: AdTableRowDataProps, index: number) => (
                      <TableRow component='div' hover key={index}>
                        {columns.map((column) => {
                          let value =
                            row[column?.id as keyof AdTableRowDataProps]
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

export default AdsScreen
