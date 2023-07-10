import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  id: null,
  role: 'User',
  bag: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signin: (state, action) => {
      return action.payload;
    },
    setID: (state, action) => {
      state.id = action.payload;
    },
    setBag: (state, action) => {
      state.bag = [...state.bag, action.payload];
    },
    setNewBag: (state, action) => {
      state.bag = action.payload;
    },
    setAdmin: (state, action) => {
      state.role = action.role;
    },
    resetBag: (state, action) => {
      state.bag = [];
    },
    logout: state => {
      state.id = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const {signin, setID, setBag, setNewBag, setAdmin, resetBag, logout} =
  userSlice.actions;

export default userSlice.reducer;
