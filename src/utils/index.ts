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

// const result = rows.map((row: RowFace, index: number) =>
//   Object.keys(row).map((prop: string, j: number) => {
//     return row[prop]
//   })
// )

// console.log(result)
