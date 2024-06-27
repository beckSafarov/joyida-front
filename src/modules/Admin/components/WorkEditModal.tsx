import ModalBase from '@/modules/Shared/ModalBase'
import {
  EditWorkValues,
  WorkEditModalProps,
} from '@/modules/interfaces/AdminInterfaces'
import React from 'react'
import WorkFormBase from './WorkFormBase'

const WorkEditModal = (props: WorkEditModalProps) => {
  // get the initialValues for the work info from the global state using props.id
  const initialValues: EditWorkValues = {
    name: '',
    categoryId: '',
  }

  const handleSubmit = (values: EditWorkValues) => {
    console.log(values)
    props.onClose()
  }

  const handleClose = () => {
    props.onClose()
  }
  return (
    <ModalBase {...props} title="Ishni o'zgartirish">
      <WorkFormBase
        initialValues={initialValues}
        categories={props.categories}
        onSubmit={handleSubmit}
        onClose={handleClose}
        mode={'update'}
      />
    </ModalBase>
  )
}

export default WorkEditModal
