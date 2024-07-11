export interface LocationType {
  label: string
  id: number
}

const cities = [
  'Toshkent shahar',
  'Toshkent viloyati',
  'Andijon viloyati',
  'Namangan viloyati',
  "Farg'ona viloyati",
  'Sirdaryo viloyati',
  'Jizzax viloyati',
  'Qashqadaryo viloyati',
  'Surxondaryo viloyati',
  'Samarqand viloyati',
  'Navoiy viloyati',
  'Buxoro viloyati',
  'Xorazm viloyati',
  "Qoraqolpog'iston resublikasi",
]

// const locations = [{ label: 'Toshkent shahar', id: 0 }]

const locationsData = cities.map((city, id) => ({ label: city, id }))

export default locationsData
