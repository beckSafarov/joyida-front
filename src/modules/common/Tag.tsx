import { Box, Stack } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { green, grey, red } from '@mui/material/colors'

interface TagProps {
  children?: React.ReactNode
  onClear?(): void
  variant?: 'secondary' | 'primary' | 'error'
}

const Tag: React.FC<TagProps> = ({ children, variant, onClear }) => {
  return (
    <Box
      p='5px 15px'
      bgcolor={
        variant === 'primary'
          ? green[200]
          : variant === 'error'
          ? red[300]
          : grey[300]
      }
      borderRadius='100px'
      textAlign='center'
      width='fit-content'
      color={variant === 'error' ? 'white' : 'inherit'}
    >
      <Stack direction='row' spacing={1} alignItems={'center'}>
        <Box>{children}</Box>
        {onClear && (
          <Box onClick={onClear} display='flex' alignItems='center'>
            <ClearIcon fontSize='small' sx={{ cursor: 'pointer' }} />
          </Box>
        )}
      </Stack>
    </Box>
  )
}



export default Tag
