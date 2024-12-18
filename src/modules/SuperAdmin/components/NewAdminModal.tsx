'use client'
import React from 'react'
import ModalBase from '@/modules/common/Modals/ModalBase'
import { NewAdminModalProps, NewAdminValues } from '@/interfaces/superadmin'
import axios, { AxiosError } from 'axios'
import { accessHeader, refreshHeader } from '@/utils'
import AdminForm from './AdminForm'
import { toast } from 'react-toastify'
import CustomToastContainer from '@/modules/common/CustomToastContainer'

const NewAdminModal: React.FC<NewAdminModalProps> = ({ open, onClose }) => {
  const sendToServer = async (values: NewAdminValues) => {
    try {
      const res = await axios.post(
        'https://account.joida.uz/auth/admin/create',
        values,
        refreshHeader
      )
      console.log(res)
      toast('Created Successfully', { type: 'success' })
    } catch (error: AxiosError | any) {
      toast(`${error.name}: ${error.message}`, { type: 'error' })
      console.error(error)
    }
  }

  const handleSubmit = async (values: NewAdminValues) => {
    await sendToServer(values)
    // onClose()
  }

  return (
    <>
      <ModalBase open={open} onClose={onClose} title={'Yangi Admin'}>
        <AdminForm onSubmit={handleSubmit} onCancel={onClose} />
      </ModalBase>
      <CustomToastContainer />
    </>
  )
}

export default NewAdminModal
