import { Typography } from '@mui/material'
import React from 'react'

interface Props {
  children?: React.ReactNode
  size?: 'lg' | 'md' | 'sm'
}

const defaultProps = {
  fontSize: '10px',
  size: 'md',
}

const SecondaryText = (props: Props) => {
  const fontSize =
    props.size === 'md' ? '14px' : props.size === 'sm' ? '10px' : '18px'
  return (
    <Typography fontSize={fontSize} color='grey.600'>
      {props.children}
    </Typography>
  )
}

SecondaryText.defaultProps = defaultProps

export default SecondaryText
