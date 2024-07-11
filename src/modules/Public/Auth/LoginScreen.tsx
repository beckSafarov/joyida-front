'use client'
import React from 'react'
import PublicScreenLayout from '@/modules/common/PublicScreenLayout'
import FullyCentered from '@/modules/common/FullyCentered'
import { Button, FormControl, Stack, TextField } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import Paper from '@mui/material/Paper'
import StyledLink from '@/modules/common/StyledLink'
import SecondaryText from '@/modules/common/SecondaryText'
import Title from '@/modules/common/Title'
import { LoginFormProps } from '@/interfaces/superadmin'
import { useFormik } from 'formik'

const LoginScreen = () => {
  const initialValues: LoginFormProps = {
    phone: '',
    password: '',
  }

  const handleSubmit = (values: LoginFormProps, actions: any) => {
    console.log(values)
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <PublicScreenLayout showButtons={false}>
      <FullyCentered top='40%'>
        <Title sx={{ mb: '40px' }}>Kirish</Title>
        <Paper elevation={2} sx={{ width: '600px', padding: '16px' }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack direction='column' spacing={4}>
              <FormControl>
                <MuiTelInput
                  name='phone'
                  id='phone'
                  value={formik.values.phone}
                  onChangeCapture={formik.handleChange}
                  sx={{ width: '100%', borderColor: '#CAC4D0' }}
                  autoFocus
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
              <Button type='submit' variant='contained' size='large' fullWidth>
                Jo'natish
              </Button>
            </Stack>
          </form>
        </Paper>

        <Stack direction='column' spacing={1} mt='47px' textAlign='center'>
          <SecondaryText size='sm'>
            Ro'yxatdan o'tmaganmisiz?{' '}
            <StyledLink size='sm' href='/register'>
              O'ting
            </StyledLink>
          </SecondaryText>
          <StyledLink size='sm' href='/forgot-password' display='block'>
            Parolingizni unutdingizmi?
          </StyledLink>
        </Stack>
      </FullyCentered>
    </PublicScreenLayout>
  )
}

export default LoginScreen
