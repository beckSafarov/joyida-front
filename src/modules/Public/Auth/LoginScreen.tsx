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
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { getMe, verifyToken } from './utils'
import { storeDataToLCS } from '@/utils/lcsUtils'
import { displayAxiosError } from '@/utils'
import CustomToastContainer from '@/modules/common/CustomToastContainer'
import 'react-toastify/dist/ReactToastify.css'
import Cookies from 'js-cookie'

const LoginScreen = () => {
  const initialValues: LoginFormProps = {
    phone: '',
    password: '',
  }

  const router = useRouter()
  const secret = process.env.NEXT_PUBLIC_JWT_TOKEN || ''

  const runGetMe = async () => {
    try {
      const data = await getMe()
      storeDataToLCS('user', data)
      if (data.user_role.id === 1) router.push('/superadmin')
      if (data.user_role.id === 3) router.push('/moderator/works')
    } catch (error: AxiosError | any) {
      displayAxiosError(error)
      console.error(error)
    }
  }

  const handleServerRes = async (token: string) => {
    try {
      const decoded = await verifyToken(token, secret)
      const exp = decoded.payload.exp
      const user_id = decoded.payload.user_id
      Cookies.set('access_token', token, { expires: exp })
      storeDataToLCS('user_id', String(user_id))
      storeDataToLCS('session', {
        exp: exp,
        created: new Date(),
      })
      await runGetMe()
    } catch (error: AxiosError | any) {
      displayAxiosError(error)
      console.error(error)
    }
  }

  const submitToServer = async (values: LoginFormProps) => {
    try {
      const res = await axios.post(
        'https://account.joida.uz/auth/admin/login',
        values
      )
      handleServerRes(res?.data?.access_token)
    } catch (error: AxiosError | any) {
      displayAxiosError(error)
      console.error(error)
    }
  }

  const sanitizeValues = (values: LoginFormProps) => {
    return {
      ...values,
      phone: values.phone.slice(1).split(' ').join(''),
    }
  }

  const handleSubmit = (values: LoginFormProps, actions: any) => {
    const sanitized = sanitizeValues(values)
    submitToServer(sanitized)
    actions.resetForm()
  }

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
  })

  return (
    <PublicScreenLayout showButtons={false}>
      <CustomToastContainer />
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
                Jo&apos;natish
              </Button>
            </Stack>
          </form>
        </Paper>

        <Stack direction='column' spacing={1} mt='47px' textAlign='center'>
          <SecondaryText size='sm'>
            Ro&apos;yxatdan o&apos;tmaganmisiz?{' '}
            <StyledLink size='sm' href='/register'>
              O&apos;ting
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
