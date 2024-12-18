export interface LoggedUser {
  id: number
  phone: string
  first_name: string
  last_name: string
  email: string
  gender: string
  user_role: number | null
  birth_of_date: string
  is_active: boolean
  created_at: string
  updated_at: string
}
