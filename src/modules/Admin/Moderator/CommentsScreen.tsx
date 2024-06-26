import AdminLayout from '@/modules/Shared/Admin/AdminLayout'
import SecondaryText from '@/modules/Shared/SecondaryText'
import Title from '@/modules/Shared/Title'
import {
  Avatar,
  Box,
  Button,
  Pagination,
  Rating,
  Stack,
  Typography,
} from '@mui/material'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import React from 'react'
import Image from 'next/image'
import { Circle } from '@mui/icons-material'
import { CommentsDataProps } from '@/modules/interfaces/AdminInterfaces'
import { getDateFromNow } from '@/utils'

const commentsData = [
  {
    image:
      'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2015/12/09112429/work-life-balance-working-from-home-1024x513.jpg',
    date: new Date('06/10/2024'),
    video: {
      title: 'Sample video title 1',
      author: 'Toshmat Eshmatov',
    },
    author: 'Shuhrat Qosimov',
    rating: 3,
    body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia quo at aliquam. Expedita soluta veritatis similique modi, saepe sintrepudiandae, quasi odio, quia explicabo esse voluptatibus liberovitae! Quo, debitis!',
  },
  {
    image:
      'https://fjwp.s3.amazonaws.com/blog/wp-content/uploads/2015/12/09112429/work-life-balance-working-from-home-1024x513.jpg',
    date: new Date('06/20/2024'),
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
  return (
    <AdminLayout role='moderator' title='Feedbacks here'>
      <Stack pt='10px' mb='30px' direction='row' justifyContent='space-between'>
        <SecondaryText>29/10/2021</SecondaryText>
        <Stack direction='row' spacing={1}>
          <FilterAltIcon />
          <SortIcon />
        </Stack>
      </Stack>
      <Stack direction='column' spacing={1}>
        {commentsData.map((comment: CommentsDataProps, i: number) => (
          <Box
            key={i}
            border='1px solid'
            borderColor='grey.300'
            borderRadius='4px'
            p='25px 15px 10px 25px'
          >
            <Stack direction='column' spacing={1}>
              <Stack direction='row' spacing={2}>
                <Image
                  alt='work'
                  src={comment.image}
                  width={76}
                  height={53}
                  style={{ border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <Stack direction={'column'}>
                  <Typography fontWeight='600'>
                    {comment.video.title}
                  </Typography>
                  <SecondaryText>{comment.video.author}</SecondaryText>
                </Stack>
              </Stack>
            </Stack>
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
              <Box py='10px'>{comment.body}</Box>
              <Stack pt='10px' direction='row' spacing={2}>
                <Button variant='outlined'>Kengaytirish</Button>
                <Button variant='contained' color='error'>
                  O'chirish
                </Button>
              </Stack>
            </Box>
          </Box>
        ))}
      </Stack>
      <Stack pt='30px' pb='20px' alignItems={'center'}>
        <Pagination count={5} color='primary' showFirstButton showLastButton />
      </Stack>
    </AdminLayout>
  )
}
