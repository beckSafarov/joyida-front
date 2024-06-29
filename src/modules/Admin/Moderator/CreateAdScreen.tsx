'use client'
import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import Title from '@/modules/Shared/Title'
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  TextareaAutosize,
  Typography,
} from '@mui/material'
import { blue, grey } from '@mui/material/colors'
import UploadFileIcon from '@mui/icons-material/UploadFile'
import React from 'react'
import { useFormik } from 'formik'
import categories, { CategoryProps } from '@/modules/data/categories'
import { useRouter } from 'next/navigation'

type Props = {}

type CreateAdProps = {
  image: string
  title: string
  address: string
  category: string
  workingTime: string
  adStartDate: Date
  adEndDate: Date
  adDescription: string
  icon: string
}

const CreateAdScreen = (props: Props) => {
  const router = useRouter()
  const handleSubmit = (values: CreateAdProps) => {
    console.log(values)
  }

  const f = useFormik({
    initialValues: {
      image: '',
      title: '',
      address: '',
      category: '',
      workingTime: '',
      adStartDate: new Date(),
      adEndDate: new Date(),
      adDescription: '',
      icon: '',
    },
    onSubmit: handleSubmit,
  })

  const handleReset = () => {
    f.resetForm()
    router.back()
  }

  return (
    <AdminLayout>
      <Box my='50px'>
        <Stack direction='column' spacing={1} sx={{ mt: '70px', mb: '50px' }}>
          <Title size='lg'>Yangi Reklama</Title>
          <Typography variant='subtitle1' textAlign='center'>
            O’z xizmatlaringizni boshqa foydalanuvchilarga bepul taqdim qiling
          </Typography>
        </Stack>
        <form onSubmit={f.handleSubmit}>
          <Stack direction='column'>
            <Stack direction='row' sx={{ mb: '40px' }}>
              <Stack flex='1'>
                <Typography
                  ml='-2px'
                  mb='6px'
                  sx={{ fontWeight: '300' }}
                  variant='h4'
                >
                  Rasm qo'ying
                </Typography>
                <Typography
                  maxWidth='250px'
                  variant='caption'
                  color='grey.600'
                  fontWeight='200'
                >
                  Reklamangizni tushuntirib beruvchi rasm qo’ying. Iloji boricha
                  3x5 nisbatda bo’lsin
                </Typography>
              </Stack>
              <Box flex='2' display='flex' justifyContent='left'>
                <Stack
                  direction='column'
                  width='400px'
                  height='150px'
                  border='2px dashed'
                  borderColor='grey.200'
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <UploadFileIcon sx={{ color: blue[500] }} />
                  <Typography>
                    <Typography
                      sx={{
                        textDecoration: 'underline',
                        fontWeight: '300',
                        textTransform: 'unset',
                      }}
                      variant='overline'
                      color={blue[500]}
                    >
                      Yuklash uchun bosing
                    </Typography>{' '}
                    yoki tortib olib keling
                  </Typography>
                  <Typography
                    color='grey.500'
                    fontWeight='300'
                    fontSize='0.8rem'
                  >
                    PNG yoki JPG (max. 3 MB)
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack direction='row' sx={{ mb: '40px' }}>
              <Stack flex='1'>
                <Typography
                  ml='-2px'
                  mb='6px'
                  maxWidth='300px'
                  sx={{ fontWeight: '300' }}
                  variant='h4'
                >
                  Boshlang'ich ma'lumotlar
                </Typography>
              </Stack>
              <Stack
                flex='2'
                display='flex'
                justifyContent='left'
                direction='column'
                spacing={'25px'}
              >
                <FormControl>
                  <InputLabel id='title-label' htmlFor='title'>
                    Reklama sarlavhasi
                  </InputLabel>
                  <TextField
                    id='title'
                    name='title'
                    aria-describedby='input'
                    value={f.values.title}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={f.touched.title && Boolean(f.errors.title)}
                    helperText={f.touched.title && f.errors.title}
                    sx={{ width: '400px' }}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel id='address-label' htmlFor='address'>
                    Manzil
                  </InputLabel>
                  <TextField
                    id='address'
                    name='address'
                    aria-describedby='input'
                    value={f.values.address}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={f.touched.address && Boolean(f.errors.address)}
                    helperText={f.touched.address && f.errors.address}
                    sx={{ width: '400px' }}
                  />
                </FormControl>
                <FormControl>
                  <InputLabel htmlFor='category'>
                    Reklama kategoriyasi
                  </InputLabel>
                  <Select
                    name='category'
                    id='category'
                    value={f.values['category']}
                    onChange={f.handleChange}
                    sx={{ width: '400px' }}
                  >
                    {categories.map((category: CategoryProps, i: number) => (
                      <MenuItem key={i} value={category.id}>
                        {category.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <InputLabel id='workingTime-label' htmlFor='workingTime'>
                    Ish vaqti
                  </InputLabel>
                  <TextField
                    id='workingTime'
                    name='workingTime'
                    aria-describedby='input'
                    value={f.values.workingTime}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={
                      f.touched.workingTime && Boolean(f.errors.workingTime)
                    }
                    helperText={f.touched.workingTime && f.errors.workingTime}
                    sx={{ width: '400px' }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id='adStartDate'
                    type='date'
                    name='adStartDate'
                    aria-describedby='input'
                    placeholder='DD/MM/YYY'
                    value={f.values.adStartDate}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={
                      f.touched.adStartDate && Boolean(f.errors.adStartDate)
                    }
                    sx={{ width: '400px' }}
                  />
                </FormControl>
                <FormControl>
                  <TextField
                    id='adEndDate'
                    type='date'
                    name='adEndDate'
                    aria-describedby='input'
                    placeholder='DD/MM/YYY'
                    value={f.values.adEndDate}
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    error={f.touched.adEndDate && Boolean(f.errors.adEndDate)}
                    sx={{ width: '400px' }}
                  />
                </FormControl>
              </Stack>
            </Stack>
            <Stack direction='row' sx={{ mb: '40px' }}>
              <Stack flex='1'>
                <Typography
                  ml='-2px'
                  mb='6px'
                  sx={{ fontWeight: '300' }}
                  variant='h4'
                >
                  Reklama tavsifi
                </Typography>
              </Stack>
              <Box flex='2' display='flex' justifyContent='left'>
                <FormControl>
                  <TextareaAutosize
                    id='adDescription'
                    placeholder='Tavsif'
                    name='adDescription'
                    style={{
                      width: '400px',
                      borderRadius: '4px',
                      background: 'none',
                      padding: '10px',
                      border: '1px solid',
                      borderColor: grey[400],
                      // '&hover:'{}
                    }}
                    aria-label='text area'
                    onChange={f.handleChange}
                    onBlur={f.handleBlur}
                    value={f.values.adDescription}
                    minRows={3}
                  />
                </FormControl>
              </Box>
            </Stack>
            <Stack direction='row' sx={{ mb: '40px' }}>
              <Stack flex='1'>
                <Typography
                  ml='-2px'
                  mb='6px'
                  sx={{ fontWeight: '300' }}
                  variant='h4'
                >
                  Reklama ikonkasi
                </Typography>
              </Stack>
              <Box flex='2' display='flex' justifyContent='left'>
                <Stack
                  direction='column'
                  width='400px'
                  height='150px'
                  border='2px dashed'
                  borderColor='grey.200'
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <UploadFileIcon sx={{ color: blue[500] }} />
                  <Typography>
                    <Typography
                      sx={{
                        textDecoration: 'underline',
                        fontWeight: '300',
                        textTransform: 'unset',
                      }}
                      variant='overline'
                      color={blue[500]}
                    >
                      Yuklash uchun bosing
                    </Typography>{' '}
                    yoki tortib olib keling
                  </Typography>
                  <Typography
                    color='grey.500'
                    fontWeight='300'
                    fontSize='0.8rem'
                  >
                    PNG yoki JPG (max. 3 MB)
                  </Typography>
                </Stack>
              </Box>
            </Stack>
            <Stack mt='50px' direction='row'>
              <Stack flex='1'></Stack>
              <Stack
                sx={{}}
                direction='row'
                spacing={1}
                justifyContent={'left'}
                flex={2}
              >
                <Box sx={{ m: '0 auto', width: '400px' }}>
                  <Button
                    onClick={handleReset}
                    sx={{ width: '50%' }}
                    type='reset'
                    variant='text'
                  >
                    Bekor qilish
                  </Button>
                  <Button
                    sx={{ width: '50%' }}
                    type='submit'
                    variant='contained'
                  >
                    Yaratish
                  </Button>
                </Box>
              </Stack>
            </Stack>
          </Stack>
        </form>
      </Box>
    </AdminLayout>
  )
}

export default CreateAdScreen
