'use client'
import React, { useState } from 'react'
import PublicScreenLayout from '@/modules/common/PublicScreenLayout'
import FullyCentered from '@/modules/common/FullyCentered'
import { Box, Stack, TextField, Typography } from '@mui/material'
import Title from '@/modules/common/Title'

const SmsConfirmScreen = () => {
  const [code, setCode] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(e.target.value)
  }

  return (
    <PublicScreenLayout showButtons={false}>
      <FullyCentered top='35%'>
        <TextField
          value={code}
          onChange={handleChange}
          id='hidden-textfield'
          variant='outlined'
          sx={{ opacity: 0 }}
          autoFocus
        />
        <Title
          size='sm'
          sx={{ mb: '50px', fontSize: '24px' }}
          fontStyle='semibold'
        >
          SMS dan kelgan parolni kiriting
        </Title>
        <Stack direction='row' justifyContent='center' spacing={2}>
          {[0, 1, 2, 3, 4].map((index: number) => (
            <Box
              width='42px'
              height='42px'
              borderRadius='10px'
              border='1px solid'
              borderColor='#737373'
              display='flex'
              justifyContent='center'
              alignItems='center'
              key={index}
            >
              <Typography fontWeight='600' fontSize='20px'>
                {code?.[index]}
              </Typography>
            </Box>
          ))}
        </Stack>
      </FullyCentered>
    </PublicScreenLayout>
  )
}

export default SmsConfirmScreen
