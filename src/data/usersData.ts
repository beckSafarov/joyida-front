import { category } from '@/interfaces/Works'
import { createColumnData } from '@/utils'
import locationsData from './locationsData'

export const usersTableColumns = [
  createColumnData('id', 'ID', 100),
  createColumnData('name', 'Foydalanuvchi', 200),
  createColumnData('phone', 'Telefon raqami', 100),
  createColumnData('email', 'Email', 100),
  createColumnData('birthDate', "Tug'ilgan yili", 200),
  createColumnData('gender', 'Jinsi', 100),
  createColumnData('businessStatus', 'Akkaunt turi', 100),
  createColumnData('activeStatus', 'Aktivlik', 100),
  // createColumnData('address', 'Manzili', 200),
  // createColumnData('jobTitle', 'Ish turi', 100),
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
const usersData = [
  createRowData(
    'Eshmatov Toshmat',
    '+998988884554',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('11/02/2024'),
    'male',
    false
  ),
  createRowData(
    'Xamza Rahmatov',
    '+998988884554',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('10/02/2024'),
    'male',
    true,
    'Texnik muhandis',
    [
      { name: 'texnik xizmatlar', id: 12 },
      { name: 'texnik konsultatsiya', id: 13 },
    ]
  ),
  createRowData(
    'Ibrohim Qosimov',
    '+998988884554',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('12/02/2024'),
    'male',
    false
  ),
  createRowData(
    'Zafar Asliddinov',
    '+998988884554',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('02/13/2024'),
    'male',
    true,
    'Yurist Konsultant',
    [
      { name: 'yuridik xujjatlar', id: 9 },
      { name: 'yuridiki konsultatsiya', id: 10 },
    ]
  ),
  createRowData(
    'Qudratilla Sadiyev',
    '+998988884554',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('04/15/2024'),
    'male',
    false,
    ''
  ),
  createRowData(
    'Tatasha Sharipova',
    '+998977845165',
    'Arnasoy ko&apos;chasi, 14-uy, 2',
    new Date('04/15/2024'),
    'female',
    false,
    ''
  ),
]
export default usersData

export interface UserInfoProps {
  id: 1
  name: string
  avatar: string
  title: string
  gender: boolean
  categories: category[]
  address: string
  phone: string
  isBusiness: boolean
  description: string
  experience: number
}

export const sampleUserInfo: UserInfoProps = {
  id: 1,
  name: 'Toshmat Eshmatov',
  avatar: '',
  title: 'Jurnalist',
  gender: true,
  categories: [
    { name: 'maqola yozish', id: 15 },
    { name: 'boshlovchilik', id: 16 },
    { name: 'geosiyosat', id: 17 },
    { name: 'tarix', id: 18 },
  ],
  address: "Guliston shahri, Yakkabog' tumani, 24",
  phone: '+998991354565',
  isBusiness: true,
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Error voluptas repudiandae, laboriosam, beatae deleniti, porro tempore commodi quasi nam magnam quas debitis recusandae quidem aspernatur magni eaque numquam dolores necessitatibus quod illum architecto amet eveniet incidunt. Dolore voluptatibus voluptatum, cum corporis officia vitae nesciunt quidem unde eos ipsum numquam repellat!',
  experience: 3,
}