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
import Title from './Title'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import AccountModal from './AccountModal'
import SettingsModal from './SettingsModal'

interface AdminNavbarProps {
  showTitle?: boolean
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ showTitle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const [chosenOption, setChosenOption] = React.useState<number | null>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleAccountClick = () => {
    setChosenOption(1)
    handleClose()
  }

  const handleSettingsClick = () => {
    setChosenOption(2)
    handleClose()
  }

  const handleLogoutClick = () => {
    if (window.confirm('Are you sure')) {
      window.alert('you are logged out')
    }
  }

  const menuItems = [
    {
      icon: AccountCircleIcon,
      label: 'Profilim',
      onClick: handleAccountClick,
    },
    { icon: Settings, label: 'Sozlamalar', onClick: handleSettingsClick },
    { icon: Logout, label: 'Chiqish', onClick: handleLogoutClick },
  ]

  const handleCloseModal = () => setChosenOption(null)

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
        <Title size='sm' fontStyle='bold'>
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
        {menuItems.map((item, i) => (
          <>
            {item.label === 'Chiqish' && <Divider />}
            <MenuItem key={i} onClick={item.onClick}>
              <Stack direction='row' spacing={1}>
                <item.icon />
                <Typography>{item.label}</Typography>
              </Stack>
            </MenuItem>
          </>
        ))}
      </Menu>
      <AccountModal open={chosenOption === 1} onClose={handleCloseModal} />
      <SettingsModal open={chosenOption === 2} onClose={handleCloseModal} />
    </React.Fragment>
  )
}

export default AdminNavbar
