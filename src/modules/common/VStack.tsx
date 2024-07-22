import { VStackProps } from '@/interfaces/common'
import { Stack } from '@mui/material'
import React from 'react'

const VStack = (props: VStackProps) => {
  return (
    <Stack direction='column' spacing={props.spacing} sx={props.sx}>
      {props.children}
    </Stack>
  )
}

export default VStack
