import { Box, Stack } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'
import { green } from '@mui/material/colors'

interface TagProps {
  children?: React.ReactNode
  onClear?(): void
  variant?: 'secondary' | 'primary'
}

const defaultProps = {
  bgcolor: 'grey.300',
}

const Tag: React.FC<TagProps> = ({ children, variant, onClear }) => {
  return (
    <Box
      p='10px'
      bgcolor={variant === 'primary' ? green[200] : 'grey.300'}
      borderRadius='100px'
      textAlign='center'
      width='fit-content'
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

Tag.defaultProps = defaultProps

export default Tag
