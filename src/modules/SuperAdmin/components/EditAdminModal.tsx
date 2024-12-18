'use client'
import React from 'react'
import ModalBase from '@/modules/common/Modals/ModalBase'
import { EditAdminModalProps, NewAdminValues } from '@/interfaces/superadmin'
import { accessHeader } from '@/utils'
import axios, { AxiosError } from 'axios'
import AdminForm from './AdminForm'
import { ToastContainer, toast } from 'react-toastify'

const EditAdminModal: React.FC<EditAdminModalProps> = ({
  open,
  data,
  onClose,
}) => {
  const sendToServer = async (values: NewAdminValues) => {
    console.log(values)
    try {
      const res = await axios.patch(
        `https://account.joida.uz/auth/admin/update/${data?.id}`,
        values,
        accessHeader
      )
      console.log(res)
      toast('Updated Successfully', { type: 'success' })
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
    <ModalBase open={open} onClose={onClose} title={'Edit User'}>
      <AdminForm onSubmit={handleSubmit} onCancel={onClose} data={data} />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ModalBase>
  )
}

export default EditAdminModal
