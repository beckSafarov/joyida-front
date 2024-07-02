import { Stack, Typography } from '@mui/material'
import React from 'react'

type Props = {
  title: string
  subtitle?: string
  children: React.ReactNode
}

const CreateAdFormRow = (props: Props) => {
  return (
    <Stack direction='column'>
      <Stack direction='row' sx={{ mb: '40px' }}>
        <Stack flex='1'>
          <Typography
            ml='-2px'
            mb='6px'
            sx={{ fontWeight: '300' }}
            variant='h4'
          >
            {props.title}
          </Typography>
          <Typography
            maxWidth='250px'
            variant='caption'
            color='grey.600'
            fontWeight='200'
          >
            {props.subtitle}
          </Typography>
        </Stack>
        <Stack
          flex='2'
          justifyContent={'left'}
          direction='column'
          spacing={'25px'}
        >
          {props.children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default CreateAdFormRow
