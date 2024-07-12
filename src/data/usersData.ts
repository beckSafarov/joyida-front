import { category } from '@/interfaces/Works'
import { createColumnData } from '@/utils'
import locationsData from './locationsData'

export const usersTableColumns = [
  createColumnData('name', 'Foydalanuvchi', 200),
  createColumnData('phone', 'Telefon raqami', 200),
  createColumnData('address', 'Manzili', 200),
  createColumnData('date', "Qo'shilgan sana", 200),
  createColumnData('gender', 'Jinsi', 200),
  createColumnData('isBusiness', 'Akkaunt turi', 200),
  createColumnData('jobTitle', 'Ish turi', 200),
]

export const genderOptions = [
  { label: 'erkak', id: 1 },
  { label: 'ayol', id: 0 },
]

const accountTypeOptions = [
  { label: 'Biznes', id: 1 },
  { label: 'Oddiy', id: 0 },
]
const jobTitleOptions = [
  { label: 'Texnik muhandis', id: 0 },
  { label: 'Yurist konsultant', id: 1 },
  { label: 'Sartarosh', id: 2 },
  { label: 'Karate murabbiysi', id: 3 },
  { label: 'Jurnalist', id: 4 },
]

export const filterOptions = [
  {
    name: 'address',
    label: 'Manzil',
    options: locationsData,
  },
  {
    name: 'gender',
    label: 'Jinsi',
    options: genderOptions,
  },
  {
    name: 'isBusiness',
    label: 'Akkaunt turi',
    options: accountTypeOptions,
  },
  {
    name: 'jobTitle',
    label: 'Ish turi',
    options: jobTitleOptions,
  },
]

const createRowData = (
  name: string,
  phone: string,
  address: string,
  date: Date,
  gender: 'male' | 'female',
  isBusiness: boolean,
  jobTitle?: string,
  categories?: category[]
) => ({
  name,
  phone,
  address,
  date,
  gender,
  isBusiness,
  jobTitle,
  categories,
})
export default [
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('11/02/2024'),
    'male',
    false
  ),
  createRowData(
    'Xamza Rahmatov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('10/02/2024'),
    'male',
    true,
    'Texnik muhandis',
    [
      { label: 'texnik xizmatlar', categoryId: 12 },
      { label: 'texnik konsultatsiya', categoryId: 13 },
    ]
  ),
  createRowData(
    'Ibrohim Qosimov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('12/02/2024'),
    'male',
    false
  ),
  createRowData(
    'Zafar Asliddinov',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('02/13/2024'),
    'male',
    true,
    'Yurist Konsultant',
    [
      { label: 'yuridik xujjatlar', categoryId: 9 },
      { label: 'yuridiki konsultatsiya', categoryId: 10 },
    ]
  ),
  createRowData(
    'Qudratilla Sadiyev',
    '+998988884554',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('04/15/2024'),
    'male',
    false,
    ''
  ),
  createRowData(
    'Tatasha Sharipova',
    '+998977845165',
    "Arnasoy ko'chasi, 14-uy, 2",
    new Date('04/15/2024'),
    'female',
    false,
    ''
  ),
]
