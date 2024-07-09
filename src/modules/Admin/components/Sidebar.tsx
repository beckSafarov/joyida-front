'use client'
import Title from '@/modules/Shared/Title'
import { Box, Stack, Typography } from '@mui/material'
import React from 'react'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import WebAssetIcon from '@mui/icons-material/WebAsset'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import CommentIcon from '@mui/icons-material/Comment'
import WorkIcon from '@mui/icons-material/Work'
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const MenuItems = [
  { label: 'Ishlar', icon: WorkIcon, path: '/admin/moderator/works' },
  {
    label: 'Foydalanuvchilar',
    icon: PeopleAltIcon,
    path: '/admin/moderator/users',
  },
  { label: 'Reklamalar', icon: WebAssetIcon, path: '/admin/moderator/ads' },
  { label: 'Videolar', icon: VideoLibraryIcon, path: '/admin/moderator/reels' },
  {
    label: 'Shikoyatlar',
    icon: CommentIcon,
    path: '/admin/moderator/complaints',
  },
]

const Sidebar = () => {
  const pathname = usePathname()
  console.log(pathname)
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '80px',
        height: '100%',
        maxHeight: '100vh',
        minWidth: '250px',
        p: '26px 0',
      }}
    >
      <Stack direction='column' spacing={1}>
        {MenuItems.map((item, i: number) => {
          const isActive = item.path === pathname
          return (
            <>
              <Link key={i} href={item.path}>
                <Stack
                  sx={{
                    bgcolor: isActive ? '#C1E7FE' : 'white',
                    borderTopRightRadius: '50px',
                    borderBottomRightRadius: '50px',
                    p: '10px 30px',
                  }}
                  direction='row'
                  spacing={2}
                >
                  <item.icon />
                  <Typography>{item.label}</Typography>
                </Stack>
              </Link>
            </>
          )
        })}
      </Stack>
    </Box>
  )
}

export default Sidebar
