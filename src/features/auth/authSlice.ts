import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import {
  resetPassword,
  signIn,
  signInWithGoogle,
  signOut,
  signUp,
} from "../../services/supabaseServices";

interface User {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  resetPasswordStep: 1 | 2 | 3;
  pendingResetEmail: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
  isAuthenticated: false,
  isLoading: false,
  resetPasswordStep: 1,
  pendingResetEmail: null,
};

export const registerUser = createAsyncThunk(
  "auth/signup",
  async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    const { data, error } = await signUp(userData.email, userData.password, {
      firstName: userData.firstName,
      lastName: userData.lastName,
    });

    if (error) {
      throw new Error(error.message);
    }

    return { user: data.user, email: userData.email };
  }
);

export const logInUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { data, error } = await signIn(email, password);
    if (error) throw error;

    return data.user;
  }
);

// log in with google
export const logInWithGoogle = createAsyncThunk("auth/google", async () => {
  const { data, error } = await signInWithGoogle();
  if (error) throw new Error(error.message);
  return data;
});

export const logOutUser = createAsyncThunk("auth/logout", async () => {
  const { error } = await signOut();
  if (error) throw error;
});

export const resetUserPassword = createAsyncThunk(
  "auth/resetPassword",
  async (email: string) => {
    const { error } = await resetPassword(email);
    if (error) throw error;
    return email;
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    setResetPasswordStep: (state, action: PayloadAction<1 | 2 | 3>) => {
      state.resetPasswordStep = action.payload;
    },
    setPendingResetEmail: (state, action: PayloadAction<string | null>) => {
      state.pendingResetEmail = action.payload;
    },
    resetPasswordState: (state) => {
      state.resetPasswordStep = 1;
      state.pendingResetEmail = null;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Signup failed";
      });

    // Login user
    builder
      .addCase(logInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
      });

    // Logout user
    builder.addCase(logOutUser.fulfilled, (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.resetPasswordStep = 1;
      state.pendingResetEmail = null;
    });

    // Reset password - move to step 2 (OTP verification)
    builder
      .addCase(resetUserPassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(resetUserPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.resetPasswordStep = 2;
        state.pendingResetEmail = action.payload;
      })
      .addCase(resetUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Password reset failed";
      });
  },
});

export const {
  clearError,
  setUser,
  setPendingResetEmail,
  setResetPasswordStep,
  resetPasswordState,
} = authSlice.actions;

export default authSlice.reducer;
