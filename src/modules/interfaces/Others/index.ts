import { SxProps } from '@mui/material'
import React from 'react'

export interface RowProps {
  sx?: SxProps
  children?: React.ReactNode
  spacing?: number
}

export interface VStackProps extends RowProps {}
