import React from 'react'
import { ToastContainer } from 'react-toastify'

type Props = {
  position?: string
  autoClose?: number
  hideProgressBar?: boolean
  newestOnTop?: boolean
  closeOnClick?: boolean
}

const CustomToastContainer = (props: Props) => {
  return (
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
  )
}

export default CustomToastContainer
