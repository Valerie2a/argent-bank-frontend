import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = import.meta.env.VITE_API_URL;

// Récupérer toutes les transactions via API
export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;
      
      if (!token) {
        return thunkAPI.rejectWithValue("Token manquant");
      }

      const response = await fetch(`${API}/transactions`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Erreur inconnue");
      }

      return data.body;
      
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau");
    }
  }
);

// Mettre à jour une transaction (catégorie, note)
export const updateTransaction = createAsyncThunk(
  'transactions/updateTransaction',
  async ({ transactionId, updates }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().user.token;

      if (!token) {
        return thunkAPI.rejectWithValue("Token manquant");
      }

      const response = await fetch(`${API}/transactions/${transactionId}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      const data = await response.json();

      if (!response.ok) {
        return thunkAPI.rejectWithValue(data.message || "Erreur mise à jour");
      }

      return { ...updates, id: transactionId, accountId: thunkAPI.getState().user.accountId };
    } catch (error) {
      return thunkAPI.rejectWithValue("Erreur réseau lors de la mise à jour");
    }
  }
);

// État initial
const initialState = {
  data: {}, // { [accountId]: [transactions] }
  loading: false,
  error: null,
};

const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    // Réinitialiser l'état des transactions
    clearTransactions: (state) => {
      state.data = {};
      state.loading = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // fetchTransactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Grouper les transactions par accountId
        if (action.payload && Array.isArray(action.payload)) {
          const groupedByAccount = {};
          
          action.payload.forEach((transaction) => {
            const { accountId } = transaction;
            if (!groupedByAccount[accountId]) {
              groupedByAccount[accountId] = [];
            }
            groupedByAccount[accountId].push(transaction);
          });
          
          state.data = groupedByAccount;
        } else {
          state.data = {};
        }
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = {};
      })
      // updateTransaction
      .addCase(updateTransaction.fulfilled, (state, action) => {
        const updated = action.payload;

        // Mettre à jour la transaction dans le bon compte
        for (const accountId in state.data) {
          const transactions = state.data[accountId];
          const index = transactions.findIndex(txn => txn.id === updated.id);
          if (index !== -1) {
            transactions[index] = { ...transactions[index], ...updated };
            break;
          }
        }
      });
  },
});

export const { clearTransactions } = transactionSlice.actions;
export default transactionSlice.reducer;