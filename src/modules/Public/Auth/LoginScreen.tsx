'use client'
import React from 'react'
import PublicScreenLayout from '../Shared/PublicScreenLayout'
import FullyCentered from '../Shared/FullyCentered'
import { Button, Stack, Typography } from '@mui/material'
import { MuiTelInput } from 'mui-tel-input'
import Paper from '@mui/material/Paper'
import StyledLink from '../Shared/StyledLink'
import SecondaryText from '../Shared/SecondaryText'

const LoginScreen = () => {
  const [phoneNumber, setPhoneNumber] = React.useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value)
  }

  return (
    <>
      <PublicScreenLayout showButtons={false}>
        <FullyCentered top='40%'>
          <Typography variant='h3' textAlign='center' mb='40px'>
            Kirish
          </Typography>
          <Paper elevation={2} sx={{ width: '600px', padding: '16px' }}>
            <Stack direction='column' spacing={4}>
              <MuiTelInput
                value={phoneNumber}
                onChangeCapture={handleChange}
                sx={{ width: '100%', borderColor: '#CAC4D0' }}
              />
              <Button type='submit' variant='contained' size='large' fullWidth>
                Jo'natish
              </Button>
            </Stack>
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
    </>
  )
}

export default LoginScreen
