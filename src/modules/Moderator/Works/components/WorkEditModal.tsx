// import ModalBase from '@/modules/common/Modal'
import { EditWorkValues } from '@/interfaces/Works'
import React from 'react'
import WorkFormBase from './WorkFormBase'
import { WorkEditModalProps } from '@/interfaces/Works'
import ModalBase from '@/modules/common/Modals/ModalBase'
import axios from 'axios'

const WorkEditModal = (props: WorkEditModalProps) => {
  const initialValues: EditWorkValues = {
    name: '',
    category_id: 0,
  }

  const handleSubmit = async (values: EditWorkValues) => {
    const res = await axios.put(
      `${process.env.NEXT_PUBLIC_API_1}/service/${props.workId}`,
      { ...values, id: props.workId }
    )
    console.log(res)
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
