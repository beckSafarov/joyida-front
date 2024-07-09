import ModalBase from '@/modules/Shared/ModalBase'
import Row from '@/modules/Shared/Row'
import {
  NewAdminModalProps,
  ReelsViewProps,
} from '@/modules/interfaces/AdminInterfaces'
import { Button, Typography } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'

const video: ReelsViewProps = {
  id: '1',
  thumbnail: '',
  title: 'Professional ishlash',
  date: new Date(),
  views: 10,
  status: false,
  source: 'https://shorturl.at/JxU8R',
}

const ReelsModal = (props: NewAdminModalProps) => {
  return (
    <ModalBase
      width='fit-content'
      {...props}
      title={video.title}
      titleAlign='left'
      top='5%'
    >
      <ReactPlayer url={video.source} controls />
      <Row sx={{ width: '100%', mt: '30px', gap: '20px' }}>
        <Button sx={{ width: '50%' }} variant='contained' color='info'>
          <Row spacing={1}>
            <CheckIcon />
            <Typography>Tasdiqlash</Typography>
          </Row>
        </Button>
        <Button sx={{ width: '50%' }} variant='contained' color='error'>
          <Row spacing={1}>
            <ClearIcon />
            <Typography>O'chirish</Typography>
          </Row>
        </Button>
      </Row>
    </ModalBase>
  )
}

export default ReelsModal
