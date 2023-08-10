import { UserResponse } from '@/interface/types';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userInfo: null | UserResponse;
}

const initialState: UserState = {
  userInfo: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserResponse | null>) => {
      state.userInfo = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setUser } = userSlice.actions;

export default userSlice.reducer;
