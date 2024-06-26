import ModalBase from '@/modules/Shared/ModalBase'
import {
  NewWorkModalFace,
  NewWorkValues,
  category,
} from '@/modules/interfaces/AdminInterfaces'
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import React from 'react'

const NewWorkModal = (props: NewWorkModalFace) => {
  const initialValues: NewWorkValues = {
    name: '',
    categoryId: '',
  }

  const handleSubmit = (values: NewWorkValues, actions: any) => {
    console.log(values)
    actions.resetForm()
    props.onClose()
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    formik.resetForm()
    props.onClose()
  }
  return (
    <ModalBase {...props} title='Yangi Ish'>
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={2}>
          <FormControl>
            <TextField
              name='name'
              id='name'
              label='Nomi'
              value={formik.values['name']}
              type='text'
              onChange={formik.handleChange}
              autoFocus={true}
            />
          </FormControl>
          <FormControl>
            <InputLabel>Kategoriya</InputLabel>
            <Select
              name='categoryId'
              labelId='demo-simple-select-label'
              id='category-select'
              value={formik.values['categoryId']}
              sx={{ width: '100%' }}
              onChange={formik.handleChange}
            >
              {props.categories.map((category: category, i: number) => (
                <MenuItem key={i} value={category.categoryId}>
                  {category.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>{' '}
        <Stack mt='40px' direction='row' spacing={1}>
          <Button
            onClick={handleClose}
            sx={{ width: '50%' }}
            type='reset'
            variant='outlined'
          >
            Bekor qilish
          </Button>
          <Button sx={{ width: '50%' }} type='submit' variant='contained'>
            Yaratish
          </Button>
        </Stack>
      </form>
    </ModalBase>
  )
}

export default NewWorkModal
