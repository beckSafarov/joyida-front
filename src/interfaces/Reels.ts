import { NewAdminModalProps } from './superadmin'

export interface ReelsModalProps extends NewAdminModalProps {}


export interface ReelsDataFromServer {
  id: number
  author_id: string
  name: string
  comment: string
  video_image_path: string
  is_checked: string
  created_at: string
}

interface NormalizedProps {
  is_checked: boolean
}

export interface NormalizedReelsData
  extends Omit<ReelsDataFromServer, keyof NormalizedProps>,
    NormalizedProps {}

export interface ReelsOptionProps {
  label: string
  id: string
}

/**
 *  "id": 1,
        "author_id": "0",
        "name": "string",
        "comment": "None",
        "video_image_path": "string",
        "is_checked": "None",
        "created_at": "2024-08-27 18:03:51.155175",
        "updated_at": "2024-08-27 18:03:51.155180"
 */
