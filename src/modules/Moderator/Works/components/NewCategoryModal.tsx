'use client'
import { NewCategoryModal as NewCategoryModalProps } from '@/interfaces/Works'
import ModalBase from '@/modules/common/ModalBase'
import VStack from '@/modules/common/VStack'
import { Button, FormControl, TextField } from '@mui/material'
import React, { useState } from 'react'

const NewCategoryModal = (props: NewCategoryModalProps) => {
  const [categoryName, setCategoryName] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value)
  }

  const handleSubmit = () => {
    props.onSubmit({ label: categoryName, categoryId: 1 })
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
