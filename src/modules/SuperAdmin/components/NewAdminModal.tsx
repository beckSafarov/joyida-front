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
import React from 'react'
import ModalBase from '@/modules/common/Modals/ModalBase'
import { NewAdminModalProps, NewAdminValues } from '@/interfaces/superadmin'
import Row from '@/modules/common/Row'

const defaultProps = {
  open: false,
  onClose: () => void 0,
}

const NewAdminModal: React.FC<NewAdminModalProps> = ({ open, onClose }) => {
  const initialValues: NewAdminValues = {
    first_name: '',
    last_name: '',
    phone: '',
    password: '',
    position: '',
  }

  const handleSubmit = (values: NewAdminValues, actions: any) => {
    console.log(values)
    actions.resetForm()
    onClose()
  }
  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  const handleClose = () => {
    formik.resetForm()
    onClose()
  }

  return (
    <ModalBase open={open} onClose={handleClose} title={'Yangi Admin'}>
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
              label='Paroli'
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

NewAdminModal.defaultProps = defaultProps

export default NewAdminModal
