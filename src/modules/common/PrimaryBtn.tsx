import { Button } from '@mui/material'
import React from 'react'

interface PrimaryBtnProps {
  children?: React.ReactNode
  size: 'small' | 'medium' | 'large'
}

const PrimaryBtn: React.FC<PrimaryBtnProps> = ({ children, size }) => {
  return (
    <Button variant='contained' size={size}>
      {children}
    </Button>
  )
}

export default PrimaryBtn
