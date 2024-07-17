import ModalBase from '@/modules/common/ModalBase'
import Row from '@/modules/common/Row'
import { ReelsViewProps } from '@/interfaces/Reels'
import { Button, Typography } from '@mui/material'
import React from 'react'
import ReactPlayer from 'react-player'
import CheckIcon from '@mui/icons-material/Check'
import ClearIcon from '@mui/icons-material/Clear'
import { NewAdminModalProps } from '@/interfaces/superadmin'

const video: ReelsViewProps = {
  id: '1',
  thumbnail: '',
  title: 'Professional ishlash',
  date: new Date(),
  views: 10,
  status: false,
  source: 'https://youtu.be/86cpfsP0aPs',
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
            <Typography>O&apos;chirish</Typography>
          </Row>
        </Button>
      </Row>
    </ModalBase>
  )
}

export default ReelsModal
