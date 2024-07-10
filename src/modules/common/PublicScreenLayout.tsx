'use client'
import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import Link from 'next/link'

interface Props {
  window?: () => Window
  children?: React.ReactNode
  showButtons?: boolean
}

const defaultProps = {
  showButtons: true,
}

const drawerWidth = 240
const navItems = ['Home', 'About', 'Contact']

export default function PublicScreenLayout(props: Props) {
  const { window } = props
  const [mobileOpen, setMobileOpen] = React.useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container =
    window !== undefined ? () => window().document.body : undefined

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar component='nav' sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant='h6'
            color='#000'
            component='div'
            sx={{
              flexGrow: 1,
              fontWeight: '600',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Link href='/'>JOIDA</Link>
          </Typography>
          {props.showButtons && (
            <Stack
              direction='row'
              spacing={3}
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              <Link href='/login'>
                <Button
                  variant='text'
                  size='large'
                  sx={{ px: '20px' }}
                  style={{ paddingRight: '20px' }}
                >
                  Kirish
                </Button>
              </Link>
              <Link href='/sms-confirm'>
                <Button size='large' variant='contained'>
                  Royxatdan otish
                </Button>
              </Link>
            </Stack>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component='main' sx={{ p: 3, width: '100%' }}>
        <Toolbar />
        {props.children}
      </Box>
    </Box>
  )
}

PublicScreenLayout.defaultProps = defaultProps 