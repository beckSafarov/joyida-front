import { SxProps } from '@mui/material'
import React from 'react'

export interface TableRowFace {
  name: string
  phone: string
  position: string
  date: Date
}

export interface AdminLayoutProps {
  children?: React.ReactNode
  role?: 'superadmin' | 'moderator'
  title?: string
}

export interface RowProps {
  sx?: SxProps
  children?: React.ReactNode
  spacing?: number
}

export interface VStackProps extends RowProps {}
