'use client'
import ModalBase from '@/modules/common/ModalBase'
import Row from '@/modules/common/Row'
import categoriesData from '@/data/categoriesData'
import { AdInfoModalProps, AdInfoProps } from '@/interfaces/Ads'
import { Box, Button, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LabelIcon from '@mui/icons-material/Label'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import VStack from '@/modules/common/VStack'
import { InfoRowType } from '@/types'

const infoIcons = {
  address: LocationOnIcon,
  category: LabelIcon,
  workingTime: AccessTimeIcon,
  adDuration: CalendarMonthIcon,
}

const infoRows: InfoRowType[] = [
  { name: 'address', icon: LocationOnIcon },
  { name: 'category', icon: LabelIcon },
  { name: 'workingTime', icon: AccessTimeIcon },
  { name: 'adDuration', icon: CalendarMonthIcon },
]

const sampleAd: AdInfoProps = {
  image: '/images/working.jpg',
  title: 'Bro Barbershop',
  address: 'Chilonzor, Arnasoy ko&apos;chasi, 24',
  category: categoriesData[0].label,
  workingTime: 'Dushanba - Juma, 9:00 - 18:00',
  adStartDate: new Date('07/24/2024'),
  adEndDate: new Date('08/01/2024'),
  adDescription:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat modi, culpa eos qui at vel repudiandae. Magnam cupiditate quasi id. Tempora accusamus dolorem mollitia dignissimos debitis blanditiis autem, consectetur aliquid consequatur veniam enim animi delectus totam eveniet eos rerum, laudantium fugit. Ullam iste dignissimos numquam dolore, perferendis dolorum quia vero!',
  icon: '/images/logo.webp',
}

const AdInfoModal = (props: AdInfoModalProps) => {
  const adDuration = `${sampleAd.adStartDate.toDateString()} - ${sampleAd.adEndDate.toDateString()}`

  const handleClose = () => {
    props.onClose()
  }
  const handleDelete = () => {
    if (window.confirm("Haqiqattan o'chirmoqchimisiz?")) {
      props.onClose()
    }
  }

  return (
    <ModalBase
      title={sampleAd.title}
      titleAlign='left'
      open={props.open}
      onClose={handleClose}
      width='912px'
    >
      <Row>
        <Box flex='1'>
          <Image src={sampleAd.image} width={337} height={216} alt='Ad Photo' />
        </Box>
        <Box flex='2' pl='50px'>
          <Typography fontWeight='600' fontSize='20px'>
            Boshlang&apos;ich ma&apos;lumotlar
          </Typography>
          <VStack spacing={2} sx={{ mt: '18px' }}>
            {infoRows.map((row) => {
              const data =
                row.name !== 'adDuration'
                  ? sampleAd[row.name as keyof AdInfoProps]
                  : adDuration

              return (
                <Row key={row.name} spacing={2} sx={{ alignItems: 'center' }}>
                  <Box>{<row.icon />}</Box>
                  <Box>{data.toString()}</Box>
                </Row>
              )
            })}
          </VStack>
        </Box>
      </Row>
      <Box mt='24px' py='16px'>
        {sampleAd.adDescription}
      </Box>
      <Row spacing={2} sx={{ justifyContent: 'right', mt: '21px' }}>
        <Button onClick={handleDelete} variant='outlined' color='error'>
          O&apos;chirish
        </Button>
        <Button variant='outlined' color='info'>
          O&apos;zgartirish
        </Button>
      </Row>
    </ModalBase>
  )
}

export default AdInfoModal
