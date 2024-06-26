import { Modal } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import Title from './Title'

type Props = {
  open: boolean
  onClose(): void
  title: string
  top?: string
  width?: string
  children: React.ReactNode
}

const ModalBase = (props: Props) => {
  return (
    <Modal
      open={props.open}
      onClose={props.onClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      sx={{
        position: 'absolute',
        top: props.top || '15%',
        width: props.width || '500px',
        margin: '0 auto',
      }}
    >
      <Box bgcolor={'white'} p='44px' borderRadius='4px' zIndex='2'>
        <Title sx={{ mb: '30px' }}>{props.title}</Title>
        {props.children}
      </Box>
    </Modal>
  )
}

export default ModalBase
