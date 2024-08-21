import React from 'react'
import ModalBase from './ModalBase'
import { ModalProps } from '@/interfaces/common'
import MapComponent from '../MapComponent'


interface MapSelectModal extends ModalProps {}

const MapSelectModal = (props: MapSelectModal) => {
  return (
    <ModalBase
      open={props.open}
      onClose={props.onClose}
      title='Joylashuvni tanlang'
    >
      <MapComponent onLocationSelect={console.log} />
    </ModalBase>
  )
}

export default MapSelectModal
