import { NewAdminModalProps } from './superadmin'

export interface ReelsModalProps extends NewAdminModalProps {}
export interface ReelsProps {
  id: string
  thumbnail: string
  title: string
  date: Date
  views: number
  status: boolean
}

export interface ReelsViewProps extends ReelsProps {
  source: string
}

export interface ReelsOptionProps {
  label: string
  id: string
}
