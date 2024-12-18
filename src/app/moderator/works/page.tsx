'use client'
import QueryWrapper from '@/modules/common/QueryWrapper'
import WorksScreen from '@/modules/Moderator/Works/WorksScreen'
import React from 'react'

type Props = {}

const ModeratorWorksPage = (props: Props) => {
  return (
    <QueryWrapper>
      <WorksScreen />
    </QueryWrapper>
  )
}

export default ModeratorWorksPage
