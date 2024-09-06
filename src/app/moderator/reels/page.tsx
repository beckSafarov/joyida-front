import QueryWrapper from '@/modules/common/QueryWrapper'
import ReelsScreen from '@/modules/Moderator/Reels/ReelsScreen'
import React from 'react'

type Props = {}

const ReelsPage = (props: Props) => {
  return (
    <QueryWrapper>
      <ReelsScreen />
    </QueryWrapper>
  )
}

export default ReelsPage
