import React from 'react'
import ModalBase from './ModalBase'
import { ModalProps } from '@/interfaces/common'
import { Avatar, Box, Divider, Typography } from '@mui/material'
import VStack from './VStack'
import Row from './Row'

interface Props extends ModalProps {}

const AccountModal = (props: Props) => {
  return (
    <ModalBase width='400px' {...props} title='Eshmatov Toshmat'>
      <center>
        <Avatar sx={{ width: '50px', height: '50px', fontSize: '20px' }}>
          ET
        </Avatar>
      </center>
      <VStack sx={{ mt: '50px' }} spacing={2}>
        <Row spacing={2}>
          <Typography sx={{ flex: 1 }} fontWeight='500'>
            Login
          </Typography>
          <Box sx={{ flex: 2 }}>+998 95 700 30 22</Box>
        </Row>
        <Divider />
        <Row spacing={2}>
          <Typography sx={{ flex: 1 }} fontWeight='500'>
            Parol
          </Typography>
          <Box sx={{ flex: 2 }}>******</Box>
        </Row>
      </VStack>
    </ModalBase>
  )
}

export default AccountModal
