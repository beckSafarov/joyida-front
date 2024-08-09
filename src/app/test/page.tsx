'use client'
import userSlice, { fetchUsers } from '@/lib/slices/userSlice'
import { AppDispatch } from '@/lib/store'
import AdminLayout from '@/modules/common/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../modules/common/QueryWrapper'
import QueryWrapper from '../../modules/common/QueryWrapper'
import MapComponent from '@/modules/common/MapComponent'
import { Box, Divider, Typography } from '@mui/material'
import MapSelectModal from '@/modules/common/MapSelectModal'
import { Address, LatLng } from '@/interfaces/Map'

type Props = {}

const TestPage = (props: Props) => {
  // const dispatch = useDispatch<AppDispatch>()

  // useEffect(() => {
  //   getUsers()
  //   return () => {}
  // }, [])

  // const getUsers = () => {
  //   dispatch(fetchUsers())
  // }

  // const { isLoading, error, data } = useQuery({
  //   queryKey: ['usersData'],
  //   queryFn: async () =>
  //     await axios.get('https://account.joida.uz/auth/user/list', {
  //       headers: {
  //         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE1NTc4NzYsInVzZXJfaWQiOjV9.KfttYkCXYpedu74r8wEpR2j6XYznHfp_ynyQ5hAGFG8`,
  //       },
  //     }),
  // })

  // console.log({ isLoading, error, data })

  const [clicked, setClicked] = useState(false)
  const [loc, setLoc] = useState<LatLng>({ lat: 0, lng: 0 })
  const [address, setAddress] = useState<Address>({
    formattedAddress: '',
    street: '',
    houseNumber: '',
  })

  const handleLocSelect = (loc: LatLng, address: Address) => {
    setLoc(loc)
    setAddress(address)
  }

  return (
    <QueryWrapper>
      <h1>HEllo World</h1>
      <button onClick={() => setClicked(!clicked)}>Click me</button>
      {/* <MapSelectModal open={clicked} onClose={() => setClicked(false)} /> */}
      <Box sx={{ width: '500px', height: '300px' }}>
        <MapComponent onLocationSelect={handleLocSelect} />
      </Box>
      <Box sx={{ padding: '20px 10px' }}>
        <Typography component='h3'>
          Address: {address.formattedAddress}
        </Typography>
        <Divider sx={{ my: '10px' }} />
        <Typography component='h3'>Latitude: {loc.lat}</Typography>
        <Typography component='h3'>Longitude: {loc.lat}</Typography>
      </Box>
    </QueryWrapper>
  )
}

export default TestPage
