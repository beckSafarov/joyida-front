import { UserInfoProps, sampleUserInfo as user } from '@/data/usersData'
import { UserInfoModalProps } from '@/interfaces/Users'
import ModalBase from '@/modules/common/ModalBase'
import Row from '@/modules/common/Row'
import Tag from '@/modules/common/Tag'
import VStack from '@/modules/common/VStack'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import React from 'react'

const infoRows = [
  { label: 'IDsi', name: 'id' },
  { label: 'Jinsi', name: 'gender' },
  { label: 'Manzili', name: 'address' },
  { label: 'Telefon raqami', name: 'phone' },
  { label: 'Kasbi', name: 'title' },
  { label: 'Xizmatlari', name: 'categories' },
  { label: 'Tajribasi', name: 'experience' },
]

const UserInfoModal = (props: UserInfoModalProps) => {
  const getRefinedPropValue = (prop: string) => {
    const correspondingValue = user[prop as keyof UserInfoProps]
    switch (prop) {
      case 'gender':
        return <Typography>{prop ? 'Erkak' : 'Ayol'}</Typography>
      case 'isBusiness':
        return <Typography>{prop ? 'Biznes' : 'Oddiy'}</Typography>
      case 'categories':
        return (
          <Row sx={{ width: 'inherit', flexWrap: 'wrap', gap: '10px' }}>
            {user.categories.map((category, i) => (
              <Tag key={i}>{category.label}</Tag>
            ))}
          </Row>
        )
      case 'experience':
        return <Typography>{String(correspondingValue)} yil</Typography>
      default:
        return <Typography>{String(correspondingValue)}</Typography>
    }
  }

  return (
    <ModalBase {...props} title={user.name} titleAlign='left' width='700px'>
      <Row sx={{ width: '100%' }} spacing={4}>
        <Box>
          <Avatar
            variant='rounded'
            sx={{ width: '60px', height: '60px' }}
            src={user.avatar}
          >
            LE
          </Avatar>
        </Box>
        <VStack spacing={2}>
          {infoRows.map((row: { label: string; name: string }) => (
            <React.Fragment key={row.name}>
              <Row spacing={2}>
                <Typography sx={{ flex: 1 }} fontWeight='500'>
                  {row.label}
                </Typography>
                <Box sx={{ flex: 2 }}>{getRefinedPropValue(row.name)}</Box>
              </Row>
              <Divider />
            </React.Fragment>
          ))}
        </VStack>
      </Row>
    </ModalBase>
  )
}

export default UserInfoModal
