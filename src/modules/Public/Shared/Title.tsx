import { SxProps, Typography } from '@mui/material'
import React from 'react'

interface Props {
  size?: 'sm' | 'md' | 'lg'
  sx?: SxProps
  children?: React.ReactNode
  fontStyle?: 'regular' | 'bold' | 'semibold'
}

const defaultProps = {
  size: 'md',
  fontStyle: 'regular',
}

const Title = (props: Props) => {
  const variant = props.size === 'sm' ? 'h5' : props.size === 'md' ? 'h4' : 'h3'
  const fontWeight =
    props.fontStyle === 'regular'
      ? '500'
      : props.fontStyle === 'semibold'
      ? '600'
      : '700'
  return (
    <Typography
      fontWeight={fontWeight}
      variant={variant}
      textAlign='center'
      sx={props.sx}
    >
      {props.children}
    </Typography>
  )
}

Title.defaultProps = defaultProps

export default Title
