// could also have an onClick, style (e.g. tag) props for each row
const createData = (
  name: string,
  phone: string,
  position: string,
  date: Date
) => ({ name, phone, position, date })

const myTable = {
  columns: [
    { id: 'name', label: 'Admin', minWidth: 300 },
    { id: 'phone', label: 'Telefon raqami', minWidth: 250 },
    { id: 'position', label: 'Vazifasi', minWidth: 250 },
    { id: 'date', label: "Qo'shilgan sana", minWidth: 250 },
  ],
  rows: [
    createData(
      'Karim Zaripov',
      '+998908871265',
      'moderator',
      new Date('10/02/2024')
    ),
    createData('Toshmat Eshmatov', '+998957003022', 'superadmin', new Date()),
    createData('Salim Salimov', '+998953641987', 'moderator', new Date()),
    createData('Azim Azimov', '+998991234567', 'superadmin', new Date()),
    createData('Tohir Saidov', '+998947768789', 'moderator', new Date()),
  ],
  search: {
    props: ['name', 'phone'],
    label: 'Ismi, telefon raqami',
  },
  sort: [
    { id: 'name', desc: true },
    { id: 'date', desc: true },
  ],
  filter: [
    {
      id: 'position',
      options: [
        {
          value: 'moderator',
          label: 'Moderator',
        },
        {
          value: 'superadmin',
          label: 'Super Admin',
        },
      ],
    },
  ],
  rowsPerPage: 10,
  buttons: [
    {
      label: 'Yangi +',
      variant: 'contained',
      onClick: () => void 0,
    },
  ],
}
