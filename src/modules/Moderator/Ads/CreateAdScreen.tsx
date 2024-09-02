// 'use client'
// import AdminLayout from '@/modules/common/AdminLayout'
// import Title from '@/modules/common/Title'
// import {
//   Box,
//   Button,
//   FormControl,
//   InputLabel,
//   MenuItem,
//   Select,
//   Stack,
//   TextField,
//   TextareaAutosize,
//   Typography,
// } from '@mui/material'
// import { grey } from '@mui/material/colors'
// import React from 'react'
// import { useFormik } from 'formik'
// import categoriesData, { CategoryProps } from '@/data/categoriesData'
// import { useRouter } from 'next/navigation'
// import CreateAdFormRow from '@/modules/Moderator/Ads/components/CreateAdFormRow'
// import UploadFileField from '@/modules/common/UploadFileField'
// import { CreateAdProps } from '@/interfaces/Ads'
// import { Address, LatLng } from '@/interfaces/Map'
// import MapComponent from '@/modules/common/MapComponent'
// import UploadedFileField from '@/modules/common/UploadedFileField'

// type Location = {
//   latLng: LatLng | null
//   address: Address | null
// }

// const CreateAdScreen = () => {
//   const [loc, setLoc] = React.useState<Location>({
//     latLng: null,
//     address: null,
//   })
//   const router = useRouter()

//   const handleSubmit = (values: CreateAdProps) => {
//     console.log({ ...values, address: loc.address?.formattedAddress })
//   }

//   const f = useFormik({
//     initialValues: {
//       image: '',
//       title: '',
//       address: '',
//       category: '',
//       workingTime: '',
//       adStartDate: new Date(),
//       adEndDate: new Date(),
//       adDescription: '',
//       icon: '',
//     },
//     onSubmit: handleSubmit,
//   })

//   const handleLocSelect = (latLng: LatLng, address: Address) => {
//     console.log(address.formattedAddress)
//     setLoc({ latLng, address })
//   }

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setLoc({
//       ...loc,
//       address: {
//         formattedAddress: e.target.value,
//         street: '',
//         houseNumber: '',
//       },
//     })
//   }

//   const handleReset = () => {
//     f.resetForm()
//     router.back()
//   }

//   return (
//     <AdminLayout>
//       <Box my='50px'>
//         <Stack direction='column' spacing={1} sx={{ mt: '70px', mb: '50px' }}>
//           <Title size='lg'>Yangi Reklama</Title>
//           <Typography variant='subtitle1' textAlign='center'>
//             O’z xizmatlaringizni boshqa foydalanuvchilarga bepul taqdim qiling
//           </Typography>
//         </Stack>
//         <form onSubmit={f.handleSubmit}>
//           <Stack direction='column'>
//             <CreateAdFormRow
//               title="Rasm qo'ying"
//               subtitle='Reklamangizni tushuntirib beruvchi rasm qo’ying. Iloji boricha
//                   3x5 nisbatda bo’lsin'
//             >
//               <UploadFileField
//                 name={'image'}
//                 onChange={f.handleChange}
//                 onBlur={f.handleBlur}
//                 value={f.values['image']}
//               />
//               <UploadedFileField />
//             </CreateAdFormRow>
//             <CreateAdFormRow title="Boshlang'ich ma'lumotlar">
//               <FormControl>
//                 <TextField
//                   label='Reklama sarlavhasi'
//                   placeholder='Bro Barbershop'
//                   id='title'
//                   name='title'
//                   aria-describedby='input'
//                   value={f.values.title}
//                   onChange={f.handleChange}
//                   onBlur={f.handleBlur}
//                   error={f.touched.title && Boolean(f.errors.title)}
//                   helperText={f.touched.title && f.errors.title}
//                   sx={{ width: '400px' }}
//                 />
//               </FormControl>
//               <FormControl>
//                 <InputLabel htmlFor='category'>Reklama kategoriyasi</InputLabel>
//                 <Select
//                   name='category'
//                   id='category'
//                   value={f.values['category']}
//                   onChange={f.handleChange}
//                   sx={{ width: '400px' }}
//                 >
//                   {categoriesData.map((category: CategoryProps, i: number) => (
//                     <MenuItem key={i} value={category.id}>
//                       {category.label}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//               <FormControl>
//                 <TextField
//                   label='Ish vaqti'
//                   placeholder='Dushanba - Juma, 9:00 - 18:00'
//                   id='workingTime'
//                   name='workingTime'
//                   aria-describedby='input'
//                   value={f.values.workingTime}
//                   onChange={f.handleChange}
//                   onBlur={f.handleBlur}
//                   error={f.touched.workingTime && Boolean(f.errors.workingTime)}
//                   helperText={f.touched.workingTime && f.errors.workingTime}
//                   sx={{ width: '400px' }}
//                 />
//               </FormControl>
//               <FormControl>
//                 <TextField
//                   id='adStartDate'
//                   type='date'
//                   name='adStartDate'
//                   aria-describedby='input'
//                   placeholder='DD/MM/YYY'
//                   value={f.values.adStartDate}
//                   onChange={f.handleChange}
//                   onBlur={f.handleBlur}
//                   error={f.touched.adStartDate && Boolean(f.errors.adStartDate)}
//                   sx={{ width: '400px' }}
//                 />
//               </FormControl>
//               <FormControl>
//                 <TextField
//                   id='adEndDate'
//                   type='date'
//                   name='adEndDate'
//                   aria-describedby='input'
//                   placeholder='DD/MM/YYY'
//                   value={f.values.adEndDate}
//                   onChange={f.handleChange}
//                   onBlur={f.handleBlur}
//                   error={f.touched.adEndDate && Boolean(f.errors.adEndDate)}
//                   sx={{ width: '400px' }}
//                 />
//               </FormControl>
//             </CreateAdFormRow>
//             <CreateAdFormRow
//               title='Manzil'
//               subtitle='Reklamaning aniq joylashuvini belgilang'
//             >
//               <Box width='400px' height='300px'>
//                 <MapComponent onLocationSelect={handleLocSelect} />
//               </Box>
//               <Box>
//                 <Typography component='h3'>
//                   Latitude: {loc.latLng?.lat}
//                 </Typography>
//                 <Typography component='h3'>
//                   Longitude: {loc.latLng?.lng}
//                 </Typography>
//               </Box>
//               <FormControl>
//                 <TextField
//                   id='address'
//                   type='text'
//                   label='Manzil'
//                   placeholder='Chilonzor, Arnasoy k, 24/3'
//                   name='address'
//                   aria-describedby='input'
//                   value={loc.address?.formattedAddress || ''}
//                   onChange={handleAddressChange}
//                   onBlur={f.handleBlur}
//                   error={f.touched.address && Boolean(f.errors.address)}
//                   helperText={f.touched.address && f.errors.address}
//                   sx={{ width: '400px' }}
//                 />
//               </FormControl>
//             </CreateAdFormRow>
//             <CreateAdFormRow title='Reklama tavsifi'>
//               <FormControl>
//                 <TextareaAutosize
//                   id='adDescription'
//                   placeholder='Tavsif'
//                   name='adDescription'
//                   style={{
//                     width: '400px',
//                     borderRadius: '4px',
//                     background: 'none',
//                     padding: '10px',
//                     border: '1px solid',
//                     borderColor: grey[400],
//                   }}
//                   aria-label='text area'
//                   onChange={f.handleChange}
//                   onBlur={f.handleBlur}
//                   value={f.values.adDescription}
//                   minRows={3}
//                 />
//               </FormControl>
//             </CreateAdFormRow>
//             <CreateAdFormRow title='Logotip'>
//               <UploadFileField
//                 name='icon'
//                 onBlur={f.handleBlur}
//                 onChange={f.handleChange}
//                 value={f.values['icon']}
//               />
//             </CreateAdFormRow>
//             <Stack mt='50px' direction='row'>
//               <Stack flex='1'></Stack>
//               <Stack
//                 sx={{}}
//                 direction='row'
//                 spacing={1}
//                 justifyContent={'left'}
//                 flex={2}
//               >
//                 <Box sx={{ m: '0 auto', width: '400px' }}>
//                   <Button
//                     onClick={handleReset}
//                     sx={{ width: '50%' }}
//                     type='reset'
//                     variant='text'
//                   >
//                     Bekor qilish
//                   </Button>
//                   <Button
//                     sx={{ width: '50%' }}
//                     type='submit'
//                     variant='contained'
//                   >
//                     Yaratish
//                   </Button>
//                 </Box>
//               </Stack>
//             </Stack>
//           </Stack>
//         </form>
//       </Box>
//     </AdminLayout>
//   )
// }

// export default CreateAdScreen
