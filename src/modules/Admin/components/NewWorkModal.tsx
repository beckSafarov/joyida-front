import ModalBase from '@/modules/Shared/ModalBase'
import {
  NewWorkModalFace,
  NewWorkValues,
} from '@/modules/interfaces/AdminInterfaces'
import React from 'react'
import WorkFormBase from './WorkFormBase'

const NewWorkModal = (props: NewWorkModalFace) => {
  const initialValues: NewWorkValues = {
    name: '',
    categoryId: '',
  }

  const handleSubmit = (values: NewWorkValues) => {
    console.log(values)
    props.onClose()
  }

  const handleClose = () => {
    props.onClose()
  }
  return (
    <ModalBase {...props} title='Yangi Ish'>
      <WorkFormBase
        initialValues={initialValues}
        categories={props.categories}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </ModalBase>
  )
}

export default NewWorkModal
