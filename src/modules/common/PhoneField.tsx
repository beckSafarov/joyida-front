import { Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'

interface PhoneFieldProps {}

const defaultProps = {}

const PhoneField: React.FC<PhoneFieldProps> = ({}) => {
  const [value, setValue] = useState<string | number>('')
  const [error, setError] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regexp = /\D/g
    const currValue = e.target.value
    if (!regexp.test(currValue) && String(currValue).length <= 9)
      return setValue(Number(currValue))
  }

  const checkForLength = (): void => {
    setError(String(value).length < 9)
  }

  return (
    <Stack direction={'row'} spacing={1} alignItems={'center'}>
      <Typography>+998</Typography>
      <TextField
        size='small'
        value={value}
        type='text'
        onChange={handleChange}
        onBlur={checkForLength}
        error={error}
        fullWidth
      />
    </Stack>
  )
}

PhoneField.defaultProps = defaultProps

export default PhoneField
