'use client'
import { createColumnData } from '@/utils'
import React, { useEffect } from 'react'
import {
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
import Tag from '@/modules/common/Tag'
import { NormalizedReelsData } from '@/interfaces/Reels'
import Image from 'next/image'
import { TableDataProps } from '@/interfaces/common'

const columns = [
  createColumnData('id', 'ID', 100),
  createColumnData('name', 'Sarlavha', 150),
  createColumnData('created_at', 'Yaratilgan sana', 150),
  createColumnData('is_checked', 'Holati', 150),
]

const createRow = (
  id: string,
  thumbnail: string,
  title: string,
  date: Date,
  views: number,
  status: boolean
) => ({ id, thumbnail, title, date, views, status })

const rows = [
  createRow(
    '1',
    '/images/working.jpg',
    'Mening ish kunim',
    new Date(),
    10,
    false
  ),
  createRow(
    '2',
    '/images/working.jpg',
    'Professional ta&apos;mirlash',
    new Date(),
    10,
    true
  ),
  createRow(
    '3',
    '/images/working.jpg',
    'Go&apos;zal soch turmaklari',
    new Date(),
    10,
    false
  ),
  createRow(
    '4',
    '/images/working.jpg',
    'Eng ishonchli tanlov',
    new Date(),
    10,
    false
  ),
  createRow(
    '5',
    '/images/working.jpg',
    'Qanday qilib eng zo&apos;r',
    new Date(),
    10,
    false
  ),
]

const statusOptions = [
  { label: 'Tasdiqlanmadi', id: '0' },
  { label: 'Tasdiqlandi', id: '1' },
]

const ReelsTable = (props: TableDataProps<NormalizedReelsData>) => {
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [filterTerm, setFilterTerm] = React.useState('')
  const [dataToDisplay, setDataToDisplay] = React.useState<
    NormalizedReelsData[] | null
  >(null)

  useEffect(() => {
    if (searchTerm) handleSearch()
    if (filterTerm) handleFilter()
    if (!filterTerm && !searchTerm) resetData()
    if (props.data) setDataToDisplay(props.data)
  }, [searchTerm, filterTerm, props.data])

  const resetData = () => setDataToDisplay([])

  const handleSearch = () => {
    if (!props.data) return
    const rgx = new RegExp(searchTerm, 'gi')
    setDataToDisplay(props.data.filter((row) => rgx.test(row.name)))
  }

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value)
    setFilterTerm('')
  }

  const handleFilter = () => {
    if (!props.data) return
    setSearchTerm('')
    console.log(filterTerm)
    // setDataToDisplay(
    //   props.data.filter((row) => Number(row.status) === Number(filterTerm))
    // )
  }

  const handleSelectChange = (event: SelectChangeEvent) => {
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
    <>
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
            placeholder='Sarlavhasi'
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
              id='position-select'
              value={filterTerm}
              label='Category'
              sx={{ width: '180px' }}
              onChange={handleSelectChange}
            >
              {statusOptions.map((option, i: number) => (
                <MenuItem key={i} value={option.id}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
      {filterTerm && (
        <Tag
          onClear={() => setFilterTerm('')}
          variant={filterTerm === '1' ? 'primary' : 'secondary'}
        >
          {filterTerm == '1' ? 'Tasdiqlandi' : 'Tasdiqlanmadi'}{' '}
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
              {dataToDisplay?.map((row: NormalizedReelsData, index: number) => (
                <TableRow
                  onClick={() => props.onRowClicked(row.id)}
                  component='div'
                  hover
                  key={index}
                >
                  {columns.map((column) => {
                    let value = row[column?.id as keyof NormalizedReelsData]
                    value =
                      column.id === 'created_at'
                        ? value.toLocaleString()
                        : value
                    return (
                      <TableCell
                        style={{
                          minWidth: column.minWidth,
                          cursor: 'pointer',
                        }}
                        key={column.id}
                      >
                        {column.id === 'is_checked' ? (
                          <Tag
                            variant={
                              row.is_checked === true ? 'primary' : 'secondary'
                            }
                          >
                            {}
                          </Tag>
                        ) : column.id === 'video_image_path' ? (
                          <Image
                            width={70}
                            height={70}
                            src={String(value)}
                            alt='thumbnail'
                          />
                        ) : (
                          <>{value}</>
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

export default ReelsTable
