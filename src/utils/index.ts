import dayjs from 'dayjs'
import calendar from 'dayjs/plugin/calendar'
import relativeTime from 'dayjs/plugin/relativeTime'

type RowFace = {
  name: string
  phone: string
  position: string
  date: Date
}

const createRowData = (
  name: string,
  phone: string,
  position: string,
  date: Date
) => ({ name, phone, position, date })

const rows = [
  createRowData('Karim Zaripov', '+998957003022', 'moderator', new Date()),
  createRowData('Toshmat Eshmatov', '+998957003022', 'superadmin', new Date()),
  createRowData('Salim Salimov', '+998957003022', 'moderator', new Date()),
  createRowData('Azim Azimov', '+998957003022', 'superadmin', new Date()),
  createRowData('Tohir Saidov', '+998957003022', 'moderator', new Date()),
]
   
export const getDateFromNow = (date: Date) => {
  dayjs.extend(relativeTime)
  return dayjs(date).fromNow()
}

export const createColumnData = (
  id: string,
  label: string,
  minWidth: number
) => ({ id, label, minWidth })

// console.log(dateFormat(new Date('1/1/2024')))

// const result = rows.map((row: RowFace, index: number) =>
//   Object.keys(row).map((prop: string, j: number) => {
//     return row[prop]
//   })
// )

// console.log(result)


export const getAvatarLetters = (name: string) => {
  return name
    .split(' ')
    .map((name) => name[0])
    .join('')
}

// console.log(getAvatarLetters('Bahrom Karimov'))