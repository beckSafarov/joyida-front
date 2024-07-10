import { Box, Grid } from '@mui/material'
import React from 'react'
// import Grid from '@material-ui/core/Grid';

interface Props {
  children?: React.ReactNode
  top?: string
}

const FullyCentered = (props: Props) => {
  return (
    <Box
      position='absolute'
      top={props.top || '50%'}
      left='50%'
      sx={{ transform: 'translate(-50%, -50%)' }}
    >
      {props.children}
    </Box>
  )
}

export default FullyCentered
