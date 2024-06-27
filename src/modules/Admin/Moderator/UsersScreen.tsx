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
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material'
import React, { useEffect } from 'react'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import Tag from '@/modules/Shared/Tag'
import { createColumnData } from '@/utils'

const columns = [
  createColumnData('name', 'Foydalanuvchi', 250),
  createColumnData('phone', 'Telefon raqami', 250),
  createColumnData('address', 'Manzili', 250),
  createColumnData('feedbacks', 'Fidbeklar', 250),
  createColumnData('date', "Qo'shilgan sana", 250),
]

const createRowData = (
  name: string,
  phone: string,
  address: string,
  feedback: number,
  date: Date
) => ({ name, phone, address, feedback, date })

const rows = [
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('20/10/2024')
  ),
  createRowData(
    'Xamza Rahmatov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('10/02/2024')
  ),
  createRowData(
    'Ibrohim Qosimov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('20/10/2024')
  ),
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('20/10/2024')
  ),
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    3,
    new Date('20/10/2024')
  ),
]

const UsersScreen = () => {
  return <AdminLayout role='moderator' title='Foydalanuvchilar'></AdminLayout>
}

export default UsersScreen
