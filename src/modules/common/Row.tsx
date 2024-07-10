import { Stack, SxProps } from '@mui/material'
import React from 'react'
import { RowProps } from '../../interfaces/Others'

const Row = (props: RowProps) => {
  return (
    <Stack direction='row' spacing={props.spacing} sx={props.sx}>
      {props.children}
    </Stack>
  )
}

export default Row
