import { Box, Stack, TextField } from '@mui/material'
import React from 'react'
import Layout from '../../Shared/PublicScreenLayout'
import FullyCentered from '../../Shared/FullyCentered'
import Input from '@mui/joy/Input'
import { Input as MatInput } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'

const LandingScreen = () => {
  return (
    <>
      <Layout>
        <FullyCentered top='40%'>
          <Stack direction='column' spacing={2}>
            <Stack
              direction={'row'}
              spacing={2}
              alignItems={'center'}
              bgcolor={'#ece6f0'}
              px='20px'
              py='16px'
              borderRadius='28px'
              width='700px'
              margin='0 auto'
            >
              <MenuIcon />
              <MatInput
                placeholder='Qidiring'
                autoFocus
                fullWidth
                disableUnderline
              />
              <SearchIcon />
            </Stack>
          </Stack>
        </FullyCentered>
      </Layout>
    </>
  )
}

export default LandingScreen
