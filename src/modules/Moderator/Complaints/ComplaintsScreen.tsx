'use client'
import AdminLayout from '@/modules/common/AdminLayout'
import SecondaryText from '@/modules/common/SecondaryText'
import Title from '@/modules/common/Title'
import {
  Avatar,
  Box,
  Button,
  Divider,
  Pagination,
  Paper,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import React, { useState } from 'react'
import Image from 'next/image'
import { Circle } from '@mui/icons-material'
import { ComplaintDataProps } from '@/interfaces/Complaints'
import { getAvatarLetters } from '@/utils'
import truncate from 'lodash.truncate'
import { getDateFromNow } from '@/utils/dateUtils'

const commentsData = [
  {
    id: '1',
    image:
      'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2015/12/09112429/work-life-balance-working-from-home-1024x513.jpg',
    date: new Date('06/10/2024'),
    to: {
      name: 'Bahrom Karimov',
      title: 'Texnik muhandis',
    },
    video: {
      title: 'Sample video title 1',
      author: 'Toshmat Eshmatov',
    },
    author: 'Shuhrat Qosimov',
    rating: 3,
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quo at aliquam. Expedita soluta veritatis similique modi, saepe sintrepudiandae, quasi odio, quia explicabo esse voluptatibus liberovitae! Quo, debitis!',
  },
  {
    id: '2',
    image:
      'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2015/12/09112429/work-life-balance-working-from-home-1024x513.jpg',
    date: new Date('06/20/2024'),
    to: {
      name: 'Bahrom Karimov',
      title: 'Texnik muhandis',
    },
    video: {
      title: 'Sample video title 2',
      author: 'John Doe',
    },
    author: 'Yahyo Karimov',
    rating: 5,
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quo at aliquam. Expedita soluta veritatis similique modi, saepe sintrepudiandae, quasi odio, quia explicabo esse voluptatibus liberovitae! Quo, debitis!',
  },
]

export default function CommentsScreen() {
  const [activeComments, setActiveComments] = useState<String[]>([])

  const isActive = (id: string) =>
    activeComments.find((commentId) => commentId === id)

  const toggleActive = (id: string) => {
    if (!isActive(id)) return setActiveComments([...activeComments, id])
    setActiveComments(activeComments.filter((commentId) => commentId != id))
  }

  return (
    <AdminLayout role='moderator' title='Shikoyatlar'>
      <Stack pt='10px' mb='30px' direction='row' justifyContent='space-between'>
        <SecondaryText>29/10/2021</SecondaryText>
        <Stack direction='row' spacing={1}>
          <FilterAltIcon />
          <SortIcon />
        </Stack>
      </Stack>
      <Stack direction='column' spacing={1}>
        {commentsData.map((comment: ComplaintDataProps, i: number) => (
          <Paper
            elevation={1}
            key={i}
            // border='1px solid'
            // borderColor='grey.300'
            // borderRadius='4px'
            sx={{ p: '25px 15px 10px 25px' }}
            // p='25px 15px 10px 25px'
          >
            <Stack direction='column' spacing={1}>
              <Stack direction='row' spacing={2}>
                <Avatar>{getAvatarLetters(comment.to.name)}</Avatar>
                <Stack direction={'column'}>
                  <Typography fontWeight='600'>{comment.to.name}</Typography>
                  <SecondaryText>{comment.to.title}</SecondaryText>
                </Stack>
              </Stack>
            </Stack>
            <Divider sx={{ py: '10px' }} />
            <Box p='16px 0'>
              <Stack direction='row' spacing={2}>
                <Box>
                  <Avatar>ET</Avatar>
                </Box>
                <Stack spacing={0.5}>
                  <Rating name='read-only' value={comment.rating} readOnly />
                  <Stack direction={'row'} spacing={1} alignItems={'center'}>
                    <Typography fontWeight='500' fontSize='14px'>
                      {comment.author}
                    </Typography>
                    <Circle sx={{ fontSize: '5px' }} />
                    <Typography fontWeight='500' fontSize='14px'>
                      {getDateFromNow(comment.date)}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Box py='10px'>
                {truncate(comment.body, {
                  length: activeComments.find(
                    (commentId) => commentId === comment.id
                  )
                    ? 500
                    : 180,
                })}
              </Box>
              <Stack pt='10px' direction='row' spacing={2}>
                <Button variant='text' onClick={() => toggleActive(comment.id)}>
                  {isActive(comment.id) ? 'Qisqartirish' : 'Kengaytirish'}
                </Button>
                <Button variant='contained' color='error'>
                  O'chirish
                </Button>
              </Stack>
            </Box>
          </Paper>
        ))}
      </Stack>
      <Stack pt='30px' pb='20px' alignItems={'center'}>
        <Pagination count={5} color='primary' showFirstButton showLastButton />
      </Stack>
    </AdminLayout>
  )
}
