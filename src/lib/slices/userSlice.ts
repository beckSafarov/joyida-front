import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserProps {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface UsersState {
  loading: boolean
  entities: UserProps[] | []
}

const initialState: UsersState = {
  loading: false,
  entities: [],
}

export const fetchUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const data = await response.json()
  return data
})

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UsersState>) {
      state = action.payload // Type-safe assignment
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<UserProps[]>) => {
        state.entities = [...state.entities, ...action.payload]
      }
    )
  },
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
