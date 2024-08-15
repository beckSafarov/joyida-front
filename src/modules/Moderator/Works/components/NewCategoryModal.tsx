'use client'
import { NewCategoryModal as NewCategoryModalProps } from '@/interfaces/Works'
import ModalBase from '@/modules/common/ModalBase'
import VStack from '@/modules/common/VStack'
import { Button, FormControl, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useState } from 'react'

const NewCategoryModal = (props: NewCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = async () => {
    const data = { name: categoryName, id: 1 }
    const submitRes = await axios.post(
      `https://admin.joida.uz/api/add-category`,
      { name: categoryName }
    )
    console.log(submitRes)
    props.onSubmit(data)
    props.onClose()
  }

  return (
    <ModalBase {...props} title='Yangi Kategoriya'>
      <VStack spacing={1} sx={{ pt: '20px' }}>
        <FormControl>
          <TextField
            name='newCategory'
            type='text'
            label='Yangi Kategoriya'
            placeholder='Savdo-sotiq'
            value={categoryName}
            onChange={handleChange}
          />
        </FormControl>
        <Button onClick={handleSubmit} variant='contained' fullWidth>
          Yaratish
        </Button>
      </VStack>
    </ModalBase>
  )
}

export default NewCategoryModal
