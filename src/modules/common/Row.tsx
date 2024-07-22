import { RowProps } from '@/interfaces/common'
import { Stack } from '@mui/material'
import React from 'react'

const Row = (props: RowProps) => {
  return (
    <Stack direction='row' spacing={props.spacing} sx={props.sx}>
      {props.children}
    </Stack>
  )
}

export default Row
