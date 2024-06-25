import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { useFormik } from 'formik'
import { MuiTelInput } from 'mui-tel-input'
import React from 'react'
import Title from '../../Shared/Title'

interface NewAdminModalProps {
  open: boolean
  onClose(): void
}

const defaultProps = {
  open: false,
  onClose: () => void 0,
}

interface NewAdminValues {
  name: string
  phone: string
  position: string
}

const NewAdminModal: React.FC<NewAdminModalProps> = ({ open, onClose }) => {
  const initialValues: NewAdminValues = {
    name: '',
    phone: '',
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
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        position: 'absolute',
        top: '15%',
        width: '500px',
        margin: '0 auto',
      }}
    >
      <Box bgcolor={'white'} p='44px' borderRadius='4px' zIndex='2'>
        <Title sx={{ mb: '30px' }}>Yangi Admin</Title>
        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={2}>
            <FormControl>
              <TextField
                name='name'
                id='name'
                label='Ismi'
                value={formik.values['name']}
                type='text'
                onChange={formik.handleChange}
                autoFocus={true}
              />
            </FormControl>
            <FormControl>
              <MuiTelInput
                name={'phone'}
                value={formik.values['phone']}
                onChangeCapture={formik.handleChange}
                sx={{ width: '100%', borderColor: '#CAC4D0' }}
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
      </Box>
    </Modal>
  )
}

NewAdminModal.defaultProps = defaultProps

export default NewAdminModal
