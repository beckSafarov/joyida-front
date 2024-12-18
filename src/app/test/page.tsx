'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Wrapper from '../../modules/common/QueryWrapper'
import QueryWrapper from '../../modules/common/QueryWrapper'
import MapComponent from '@/modules/common/MapComponent'
import { Box, Divider, Typography } from '@mui/material'
import { Address, LatLng } from '@/interfaces/Map'

type Props = {}

const TestPage = (props: Props) => {
  const [data, setData] = useState({})

  const fetchData = async () => {
    try {
      const res = await axios.get(
        'https://4a07-195-158-9-110.ngrok-free.app/categories/2',
        {
          headers: {
            'ngrok-skip-browser-warning': '69420',
          },
        }
      )
      console.log(res)
    } catch (error) {
      console.error(error)
    }
    // const json = await res.json()
    // setData(json)
  }

  useEffect(() => {
    fetchData()
  }, [])

  console.log(data)
  return (
    <>
      <h1>HEllo World</h1>
    </>
  )
}

export default TestPage
