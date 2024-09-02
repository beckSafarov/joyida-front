'use client'
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
import { MuiTelInput } from 'mui-tel-input'
import React, { useEffect } from 'react'
import {
  NewAdminFormProps,
  NewAdminValues,
  NormalizedAdminProps,
} from '@/interfaces/superadmin'
import Row from '@/modules/common/Row'

interface AdminFormProps {
  onSubmit(values: NewAdminValues): void
  onCancel(): void
  data?: NormalizedAdminProps | null
}

const defaultValues: NewAdminFormProps = {
  first_name: '',
  last_name: '',
  phone: '',
  password: '',
  position: 0,
}

const AdminForm: React.FC<AdminFormProps> = ({ onSubmit, onCancel, data }) => {
  useEffect(() => {
    if (data) updateFormikFields()
  }, [open])

  const handleSubmit = async (values: NewAdminFormProps, actions: any) => {
    await onSubmit({
      ...values,
      is_admin: values.position === 1,
      is_moderator: values.position === 3,
      user_role: values.position,
    })
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: handleSubmit,
  })

  const updateFormikFields = () => {
    formik.setFieldValue('first_name', data?.name.split(' ')[0])
    formik.setFieldValue('last_name', data?.name.split(' ')[1])
    formik.setFieldValue('position', data?.position === 'superadmin' ? 1 : 3)
    formik.setFieldValue('phone', data?.phone)
  }

  const handleClose = () => {
    formik.resetForm()
    onCancel()
  }

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={2}>
        <Row spacing={1}>
          <FormControl>
            <TextField
              name='first_name'
              id='first_name'
              label='Ismi'
              value={formik.values['first_name']}
              type='text'
              onChange={formik.handleChange}
              autoFocus={true}
            />
          </FormControl>
          <FormControl>
            <TextField
              name='last_name'
              id='last_name'
              label='Familyasi'
              value={formik.values['last_name']}
              type='text'
              onChange={formik.handleChange}
            />
          </FormControl>
        </Row>
        <FormControl>
          <MuiTelInput
            name={'phone'}
            value={formik.values['phone']}
            onChangeCapture={formik.handleChange}
            sx={{ width: '100%', borderColor: '#CAC4D0' }}
          />
        </FormControl>
        <FormControl>
          <TextField
            name='password'
            id='password'
            label='Parol'
            value={formik.values['password']}
            type='password'
            onChange={formik.handleChange}
            autoFocus={true}
          />
        </FormControl>
        <FormControl>
          <InputLabel>Admin turi</InputLabel>
          <Select
            name='position'
            labelId='demo-simple-select-label'
            id='position-select'
            value={formik.values['position']}
            sx={{ width: '100%' }}
            onChange={formik.handleChange}
          >
            <MenuItem value={3}>Moderator</MenuItem>
            <MenuItem value={1}>Superadmin</MenuItem>
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
  )
}

export default AdminForm
