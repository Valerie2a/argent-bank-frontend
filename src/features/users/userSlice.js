import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body.token; // retour du token
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau");
    }
  }
);
const initialState = {
 token: null,
  status: "idle",
  error: null,
  loading: false,
};

const userSlice = createSlice ({ 
     name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
},
},
    extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; // ici on reçoit le token
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;