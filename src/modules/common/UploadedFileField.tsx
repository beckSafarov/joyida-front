import { UploadFile } from '@mui/icons-material'
import { Box, CircularProgress, Paper, Stack, Typography } from '@mui/material'
import React from 'react'
import Row from './Row'
import VStack from './VStack'
import SecondaryText from './SecondaryText'
import DeleteIcon from '@mui/icons-material/Delete'

type Props = {
  width?: string
}

const UploadedFileField = (props: Props) => {
  return (
    <Paper elevation={1} sx={{ width: props.width || '400px' }}>
      <Stack sx={{ padding: '16px' }}>
        <Row sx={{ justifyContent: 'space-between' }}>
          <Row spacing={1}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <UploadFile color='primary' />
            </Box>
            <VStack>
              <Typography fontWeight='400'>image.png</Typography>
              <Row spacing={1}>
                <SecondaryText>100kb</SecondaryText>
                <SecondaryText>Loading</SecondaryText>
              </Row>
            </VStack>
          </Row>
          <Row
            spacing={1}
            sx={{ justifyContent: 'center', alignItems: 'center' }}
          >
            <DeleteIcon sx={{ fontSize: '25px' }} />
            <CircularProgress size='20px' variant='determinate' value={75} />
          </Row>
        </Row>
      </Stack>
    </Paper>
  )
}

export default UploadedFileField
