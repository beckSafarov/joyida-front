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
import React, { useEffect, useState } from 'react'
import ModalBase from '@/modules/common/Modals/ModalBase'
import {
  EditAdminModalProps,
  NewAdminValues,
  NormalizedAdminProps,
} from '@/interfaces/superadmin'
import Row from '@/modules/common/Row'

const defaultValues = {
  first_name: '',
  last_name: '',
  phone: '',
  password: '',
  position: '',
}

const getDeNormalizedData = (data: NormalizedAdminProps | null) => {
  if (!data) return
  return {
    first_name: data.name.split(' ')[0],
    last_name: data.name.split(' ')[1],
    password: '',
    position: data.position,
    phone: data.phone,
  }
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  open,
  data,
  onClose,
}) => {
  useEffect(() => {
    if (data) updateFormikFields()
  }, [open])

  const handleSubmit = (values: NewAdminValues, actions: any) => {
    console.log(values)
    actions.resetForm()
    onClose()
  }
  const formik = useFormik({
    initialValues: defaultValues,
    onSubmit: handleSubmit,
  })

  const updateFormikFields = () => {
    formik.setFieldValue('first_name', data?.name.split(' ')[0])
    formik.setFieldValue('last_name', data?.name.split(' ')[1])
    formik.setFieldValue('position', data?.position)
    formik.setFieldValue('phone', data?.phone)
  }

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <ModalBase
      open={open}
      onClose={handleClose}
      title={formik.values.first_name + ' ' + formik.values.last_name}
    >
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
              <MenuItem value={'moderator'}>Moderator</MenuItem>
              <MenuItem value={'superadmin'}>Superadmin</MenuItem>
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

export default EditAdminModal
