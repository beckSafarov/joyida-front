// import ModalBase from '@/modules/common/Modal'
import { EditWorkValues } from '@/interfaces/Works'
import React from 'react'
import WorkFormBase from './WorkFormBase'
import { WorkEditModalProps } from '@/interfaces/Works'
import ModalBase from '@/modules/common/ModalBase'
import axios from 'axios'
import { sanitizeString } from '../utils'

const WorkEditModal = (props: WorkEditModalProps) => {
  // get the initialValues for the work info from the global state using props.id
  const initialValues: EditWorkValues = {
    name: '',
    categoryId: 0,
  }

  const handleSubmit = async (values: EditWorkValues) => {
    const nameSanitized = sanitizeString(values.name)
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/add-service?name=${nameSanitized}&category_id=${values.categoryId}`,
      values
    )
    console.log(res)
    // props.onClose()
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
