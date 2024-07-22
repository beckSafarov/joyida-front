'use client'
import userSlice, { fetchUsers } from '@/lib/slices/userSlice'
import { AppDispatch } from '@/lib/store'
import AdminLayout from '@/modules/common/AdminLayout'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../../modules/common/QueryWrapper'
import QueryWrapper from '../../modules/common/QueryWrapper'

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

  const { isLoading, error, data } = useQuery({
    queryKey: ['usersData'],
    queryFn: async () =>
      await axios.get('https://account.joida.uz/auth/user/list', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MjE1NTc4NzYsInVzZXJfaWQiOjV9.KfttYkCXYpedu74r8wEpR2j6XYznHfp_ynyQ5hAGFG8`,
        },
      }),
  })

  console.log({ isLoading, error, data })

  return (
    <QueryWrapper>
      <h1>HEllo World</h1>
    </QueryWrapper>
  )
}

export default TestPage
