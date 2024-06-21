import { Box } from '@mui/material'
import React from 'react'

interface TagProps {
  children?: React.ReactNode
  bgcolor?: string
}

const defaultProps = {
  bgcolor: 'grey.300',
}

const Tag: React.FC<TagProps> = ({ children, bgcolor }) => {
  return (
    <Box
      // fontFamily='Helvetica'
      p='10px'
      bgcolor={bgcolor}
      borderRadius='100px'
      textAlign='center'
      width='fit-content'
    >
      {children}
    </Box>
  )
}

Tag.defaultProps = defaultProps

export default Tag
