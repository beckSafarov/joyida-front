import React from 'react'
import { sampleUserInfo as user } from '@/data/usersData'
import { NormalizedUserDataProps, UserInfoModalProps } from '@/interfaces/Users'
import CustomToastContainer from '@/modules/common/CustomToastContainer'
import ModalBase from '@/modules/common/Modals/ModalBase'
import Row from '@/modules/common/Row'
import Tag from '@/modules/common/Tag'
import VStack from '@/modules/common/VStack'
import { displayAxiosError, getAvatarLetters, refreshHeader } from '@/utils'
import { Avatar, Box, Button, Divider, Typography } from '@mui/material'
import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

const labelsLookup = {
  id: 'ID',
  activeStatus: 'Statusi',
  birthDate: "Tug'ilgan sana",
  createdAt: "Ro'yxatdan o'tgan sana",
  businessStatus: 'Biznesmi?',
  email: 'Email',
  phone: 'Telefoni',
  services: 'Xizmatlari',
  name: 'Ismi',
  gender: 'Jinsi',
}

interface infoRow {
  label: string
  name: string
}

const UserInfoModal = (props: UserInfoModalProps) => {
  const user = props?.data
  const originalData = props?.originalData
  console.log(props?.data)
  const infoRows = props.data
    ? Object.keys(props?.data)?.map((prop) => ({
        label: prop,
        name: String(props?.data?.[prop as keyof NormalizedUserDataProps]),
      }))
    : []

  const getRefinedPropValue = (prop: string) => {
    if (!user) return ''
    const correspondingValue = user[prop as keyof NormalizedUserDataProps]
    switch (prop) {
      case 'gender':
        return (
          <Tag
            variant={props?.data?.gender === 'Erkak' ? 'primary' : 'secondary'}
          >
            {correspondingValue}
          </Tag>
        )
      case 'activeStatus':
        return (
          <Tag variant={originalData?.is_active ? 'primary' : 'error'}>
            {correspondingValue}
          </Tag>
        )
      case 'businessStatus':
        return (
          <Tag
            variant={correspondingValue === 'Biznes' ? 'primary' : 'secondary'}
          >
            {correspondingValue}
          </Tag>
        )
      case 'categories':
        return (
          <Row sx={{ width: 'inherit', flexWrap: 'wrap', gap: '10px' }}>
            {/* {user.categories.map((category, i) => (
              <Tag key={i}>{category.name}</Tag>
            ))} */}
          </Row>
        )
      case 'experience':
        return <Typography>{String(correspondingValue)} yil</Typography>
      default:
        return <Typography>{String(correspondingValue)}</Typography>
    }
  }

  // console.log(user)
  const handleDeactivate = async () => {
    if (
      confirm(
        `${props?.data?.name} degan foydalanuvchini ovozini o'chiraylikmi?`
      )
    ) {
      try {
        const updatingData = {
          // ...props?.originalData,
          // gender: 1,
          is_active: !props.originalData?.is_active,
        }

        await axios.patch(
          `${process.env.NEXT_PUBLIC_API_2}/user/update/${props?.data?.id}`,
          updatingData,
          refreshHeader
        )

        toast('Muvaffaqiyatli yangilandi', { type: 'success' })
      } catch (error: AxiosError | any) {
        displayAxiosError(error)
        console.error(error)
      }
    }
  }

  return (
    <>
      <CustomToastContainer />
      <ModalBase
        {...props}
        title={user?.name || ''}
        titleAlign='center'
        width='500px'
        height='650px'
        top='10%'
        // sx={{ overflowY: 'hidden' }}
      >
        <Row sx={{ width: '100%' }} spacing={4}>
          <Box>
            <Avatar variant='rounded' sx={{ width: '60px', height: '60px' }}>
              {getAvatarLetters(props?.data?.name || '')}
            </Avatar>
          </Box>
          <VStack spacing={2}>
            {infoRows.map((row: { label: string; name: string }) => (
              <React.Fragment key={row.name}>
                <Row spacing={2}>
                  <Typography sx={{ flex: 1 }} fontWeight='500'>
                    {labelsLookup[row.label as keyof NormalizedUserDataProps]}
                  </Typography>
                  <Box sx={{ flex: 2 }}>{getRefinedPropValue(row.label)}</Box>
                </Row>
                <Divider />
              </React.Fragment>
            ))}
          </VStack>
        </Row>
        <Box sx={{ p: '30px 0 10px 0', w: '100%' }}>
          <Button
            onClick={handleDeactivate}
            variant='contained'
            color={props.originalData?.is_active ? 'error' : 'success'}
            fullWidth
          >
            {props.originalData?.is_active ? 'Deaktivatsiya' : 'Aktivatsiya'}
          </Button>
        </Box>
      </ModalBase>
    </>
  )
}

export default UserInfoModal
