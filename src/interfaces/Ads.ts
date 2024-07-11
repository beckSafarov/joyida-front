import { NewAdminModalProps } from './superadmin'

export interface AdInfoModalProps extends NewAdminModalProps {
  id: string
}

export interface AdTableRowDataProps {
  id: string
  name: string
  location: string
  category: string
  beginningDate: Date
  endingDate: Date
}

export interface CreateAdProps {
  image: string
  title: string
  address: string
  category: string
  workingTime: string
  adStartDate: Date
  adEndDate: Date
  adDescription: string
  icon: string
}

export interface AdInfoProps extends CreateAdProps {}
