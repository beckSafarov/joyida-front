import { Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import Link from 'next/link'
import React from 'react'
import { Url, UrlObject } from 'url'

interface Props {
  href: string
  display: string
  children?: React.ReactNode
  size?: 'lg' | 'md' | 'sm'
  // fontSize?: string
}

const defaultProps = {
  display: 'inline',
  size: 'md',
  // fontSize: 'inherit',
}

const StyledLink = (props: Props) => {
  const fontSize =
    props.size === 'md' ? '14px' : props.size === 'sm' ? '10px' : '18px'

  return (
    <Typography
      fontSize={fontSize}
      display={props.display}
      color={blue[600]}
      sx={{ '&:hover': { textDecoration: 'underline' } }}
    >
      <Link href={props.href}>{props.children}</Link>
    </Typography>
  )
}

StyledLink.defaultProps = defaultProps

export default StyledLink
