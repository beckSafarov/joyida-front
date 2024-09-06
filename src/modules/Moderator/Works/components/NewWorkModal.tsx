'use client'
import ModalBase from '@/modules/common/Modals/ModalBase'
import { NewWorkModalFace } from '@/interfaces/Works'
import React, { useState } from 'react'
import { NewWorkValues } from '@/interfaces/Works'
import WorkFormBase from './WorkFormBase'
import axios from 'axios'
import { fetchCategories, sanitizeString } from '../utils'
import { useQuery } from '@tanstack/react-query'

const NewWorkModal = (props: NewWorkModalFace) => {
  useState
  const initialValues: NewWorkValues = {
    name: '',
    category_id: 0,
  }

  const categories = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
  })

  const handleSubmit = async (values: NewWorkValues) => {
    const nameSanitized = sanitizeString(values.name)
    await axios.post(
      `${process.env.NEXT_PUBLIC_API_1}/add-service?name=${nameSanitized}&category_id=${values.category_id}`,
      values
    )
    props.onClose()
  }

  const handleClose = () => {
    props.onClose()
  }
  return (
    <ModalBase {...props} title='Yangi Ish'>
      <WorkFormBase
        initialValues={initialValues}
        categories={categories.data}
        onSubmit={handleSubmit}
        onClose={handleClose}
      />
    </ModalBase>
  )
}

export default NewWorkModal
