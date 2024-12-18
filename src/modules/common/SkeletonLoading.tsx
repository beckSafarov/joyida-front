import { Skeleton } from '@mui/material'
import React from 'react'

type Props = {
  rows: number
  height?: number
  variant?: 'text' | 'rectangular' | 'rounded' | 'circular'
}

const SkeletonLoading = ({ rows, height, variant }: Props) => {
  return (
    <>
      {Array(rows)
        .fill(0)
        .map((_, i) => (
          <Skeleton
            height={height || 30}
            key={i}
            animation='wave'
            variant={variant || 'text'}
          />
        ))}
    </>
  )
}

export default SkeletonLoading
