import { Box, Stack } from '@mui/material'
import React from 'react'
import ClearIcon from '@mui/icons-material/Clear'

interface TagProps {
  children?: React.ReactNode
  bgcolor?: string
  onClear?(): void
}

const defaultProps = {
  bgcolor: 'grey.300',
}

const Tag: React.FC<TagProps> = ({ children, bgcolor, onClear }) => {
  return (
    <Box
      // fontFamily='Helvetica'
      p='10px'
      bgcolor={bgcolor}
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
