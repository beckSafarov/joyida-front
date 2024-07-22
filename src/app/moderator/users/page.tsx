import QueryWrapper from '@/modules/common/QueryWrapper'
import UsersScreen from '@/modules/Moderator/Users/UsersScreen'
import React from 'react'

type Props = {}

const ModeratorUsersPage = (props: Props) => {
  return (
    <QueryWrapper>
      <UsersScreen />
    </QueryWrapper>
  )
}

export default ModeratorUsersPage
