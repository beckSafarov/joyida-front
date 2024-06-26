import {
  Avatar,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material'
import React from 'react'
import Title from '../Title'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

interface AdminNavbarProps {
  showTitle?: boolean
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ showTitle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)
  return (
    <React.Fragment>
      <Box
        sx={{
          position: 'fixed',
          width: '100%',
          top: 0,
          left: 0,
          px: '30px',
          pt: '30px',
        }}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <Title
          // sx={{ display: showTitle ? 'block' : 'none' }}
          size='sm'
          fontStyle='bold'
        >
          JOYIDA
        </Title>
        <Button
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          <Avatar>ET</Avatar>
        </Button>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id='basic-menu'
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <Stack direction='row' spacing={1}>
            <AccountCircleIcon />
            <Typography>Profilim</Typography>
          </Stack>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Stack direction='row' spacing={1}>
            <Settings />
            <Typography>Sozlamalar</Typography>
          </Stack>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <Stack direction='row' spacing={1}>
            <Logout />
            <Typography>Chiqish</Typography>
          </Stack>
        </MenuItem>
      </Menu>
    </React.Fragment>
  )
}

export default AdminNavbar
