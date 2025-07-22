import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk pour la connexion utilisateur
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

// Thunk pour récupérer les infos utilisateur après login
export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      
      if (!token) {
        return thunkAPI.rejectWithValue("Token manquant");
      }

      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body;
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau");
    }
  }
);

// Thunk pour mettre à jour le nom d'utilisateur
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async ({ userName }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      
      if (!token) {
        return thunkAPI.rejectWithValue("Token manquant");
      }

      const response = await fetch("http://localhost:3001/api/v1/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ userName }),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message);
      }

      return data.body; // userName, firstName, lastName
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau");
    }
  }
);

// État initial
const initialState = {
  token: localStorage.getItem('token') || null,
  userName: '',
  firstName: '',
  lastName: '',
  status: "idle",
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.token = null;
      state.userName = '';
      state.firstName = '';
      state.lastName = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload; 
        localStorage.setItem('token', action.payload);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update userProfile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userName = action.payload.userName;
        state.firstName = action.payload.firstName;
        state.lastName = action.payload.lastName;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;