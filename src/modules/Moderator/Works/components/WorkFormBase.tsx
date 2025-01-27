import { NewWorkValues, WorkFormBaseProps, category } from '@/interfaces/Works'
import {
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import { useFormik } from 'formik'
import ClearIcon from '@mui/icons-material/Clear'
import React, { useState } from 'react'
import { blue } from '@mui/material/colors'
import NewCategoryModal from './NewCategoryModal'

const WorkFormBase = (props: WorkFormBaseProps) => {
  const { initialValues } = props
  const [allCategories, setAllCategories] = useState(props.categories)
  const [openNewCategoryModal, setOpenNewCategoryModal] = useState(false)

  const handleSubmit = (values: NewWorkValues, actions: any) => {
    console.log(values)
    actions.resetForm()
    props.onSubmit(values)
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    formik.resetForm()
    props.onClose()
  }

  const handleEditCategory = () => {}
  const handleDeleteCategory = () => {}

  const handleNewCategory = (newCategory: category) => {
    setAllCategories([...allCategories, newCategory])
    formik.setFieldValue('categoryId', newCategory.categoryId)
  }

  return (
    <>
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
              {allCategories.map((category: category, i: number) => (
                <MenuItem key={i} value={category.categoryId}>
                  <Stack
                    justifyContent={'space-between'}
                    direction='row'
                    sx={{ width: '100%' }}
                  >
                    <Typography>{category.label}</Typography>
                    <ClearIcon />
                  </Stack>
                </MenuItem>
              ))}
              <Divider />
              <MenuItem onClick={() => setOpenNewCategoryModal(true)}>
                <Typography color={blue[600]}>Yangi +</Typography>
              </MenuItem>
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
            {props.mode === 'update' ? 'Yangilash' : 'Yaratish'}
          </Button>
        </Stack>
      </form>
      <NewCategoryModal
        open={openNewCategoryModal}
        onSubmit={handleNewCategory}
        onClose={() => setOpenNewCategoryModal(false)}
      />
    </>
  )
}

export default WorkFormBase
