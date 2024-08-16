'use client'
import React, { useState } from 'react'
import ModalBase from './ModalBase'
import { ModalProps } from '@/interfaces/common'
import VStack from './VStack'
import Row from './Row'
import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material'
import { getDataFromLCS, storeDataToLCS } from '@/utils/lcsUtils'

interface Props extends ModalProps {}

const LangOptions = [
  { label: <>O&apos;zbekcha</>, value: 'uz' },
  { label: 'Русский', value: 'ru' },
]
const ThemeOptions = [
  { label: 'Sistema temasi', value: 'system' },
  { label: 'Qora', value: 'dark' },
  { label: 'Oq', value: 'light' },
]

interface Settings {
  lang: string | unknown
  theme: string | unknown
}

const SettingsModal = (props: Props) => {
  const [settings, setSettings] = useState<Settings>({
    lang: getDataFromLCS('lang') || 'uz',
    theme: getDataFromLCS('theme') || 'system',
  })

  const handleChange = (e: SelectChangeEvent<unknown>) => {
    const prop = e.target.name
    const newValue = e.target.value
    setSettings({ ...settings, [prop]: newValue })
    storeDataToLCS(prop, newValue)
  }

  return (
    <ModalBase width='400px' {...props} title='Sozlamalar'>
      <VStack spacing={2}>
        <Row spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ flex: 1 }} fontWeight='500'>
            Til
          </Typography>
          <FormControl variant='standard'>
            <Select
              id='lang'
              name='lang'
              labelId='demo-simple-select-label'
              label='Til'
              value={settings.lang}
              onChange={handleChange}
              sx={{ width: '150px' }}
            >
              {LangOptions.map((lang, i) => (
                <MenuItem key={i} value={lang.value}>
                  {lang.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Row>
        <Row spacing={2} sx={{ alignItems: 'center' }}>
          <Typography sx={{ flex: 1 }} fontWeight='500'>
            Tema
          </Typography>
          <FormControl variant='standard'>
            <Select
              id='demo-simple-select'
              name='theme'
              labelId='demo-simple-select-label'
              label='Tema'
              value={settings.theme}
              onChange={handleChange}
              sx={{ width: '150px' }}
            >
              {ThemeOptions.map((theme, i) => (
                <MenuItem key={i} value={theme.value}>
                  {theme.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Row>
      </VStack>
    </ModalBase>
  )
}

export default SettingsModal
