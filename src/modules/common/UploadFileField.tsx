import { FormControl, FormLabel, Input, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import UploadFileIcon from '@mui/icons-material/UploadFile'

interface UploadFileFieldProps {
  onChange(e: React.SyntheticEvent): void
  value: string
  name: string
}

const UploadFileField = (props: UploadFileFieldProps) => {
  return (
    <Stack
      direction='column'
      width='400px'
      height='150px'
      border='2px dashed'
      borderColor='grey.200'
      justifyContent={'center'}
      alignItems={'center'}
    >
      <UploadFileIcon sx={{ color: blue[500] }} />
      <FormControl>
        <FormLabel htmlFor='image' sx={{ cursor: 'pointer' }}>
          <Typography
            sx={{
              textDecoration: 'underline',
              fontWeight: '300',
              textTransform: 'unset',
            }}
            variant='overline'
            color={blue[500]}
          >
            Yuklash uchun bosing
          </Typography>{' '}
          yoki tortib olib keling
        </FormLabel>
        <Input
          id='image'
          name={props.name}
          type='file'
          onChange={props.onChange}
          value={props.value}
          sx={{ visibility: 'hidden', width: '1px', height: '1px' }}
        />
      </FormControl>
      <Typography color='grey.500' fontWeight='300' fontSize='0.8rem'>
        PNG yoki JPG (max. 3 MB)
      </Typography>
    </Stack>
  )
}

export default UploadFileField
