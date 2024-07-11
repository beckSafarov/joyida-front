'use client'
import ModalBase from '@/modules/common/ModalBase'
import { NewWorkModalFace } from '@/interfaces/Works'
import React, { useState } from 'react'
import { NewWorkValues } from '@/interfaces/Works'
import WorkFormBase from './WorkFormBase'

const NewWorkModal = (props: NewWorkModalFace) => {
  useState
  const initialValues: NewWorkValues = {
    name: '',
    categoryId: 0,
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
