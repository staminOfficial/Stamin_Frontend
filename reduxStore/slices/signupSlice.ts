import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { PUBLIC_BASE_URL } from "@env";

//Types
interface SignupState {
    loading: boolean;
    success: boolean;
    error: string | null;
    userId: string | null; // Track user ID
    email: string | null; // Track user email
}
// Initial State
const initialState: SignupState = {
    loading: false,
    success: false,
    error: null,
    userId: null,
    email: null,
};

interface SignupPayload {
    email: string;
    firstName: string;
    lastName?: string;
    dateOfBirth?: string;
}

// Thunk for Signup
export const signupUser = createAsyncThunk<
{ message: string; userId: string; email: string }, // Returned data type on success
SignupPayload, // Argument type
{ rejectValue: string } // Rejected value type
>("auth/SignupUser", async (SignupPayload, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `${PUBLIC_BASE_URL}/api/v1/initiate-signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(SignupPayload),
            }
        );
        console.log("PUBLIC_BASE_URL:", PUBLIC_BASE_URL);

         const data = await response.json();

         if (!response.ok) {
            return rejectWithValue(
                data.message || "Signup failed. Please try again."
            );
         }
        return {
            message: data.message,
            userId: data.data.user._id,
            email: data.data.user.email,
        }
    } catch (error: any) {
        console.error("Signup Error:", error);
        return rejectWithValue("Something went wrong. Please try again later.");
    }
});

// Slices
const signupSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    resetSignupState: (state) => {
        state.loading = false;
        state.success = false;
        state.error = null;
        state.userId = null;
        state.email = null;
    },
  },
  extraReducers: (builder) => {
    // Signup Thunk
    builder
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.userId = null;
        state.email = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.userId = action.payload.userId; // Store user ID
        state.email = action.payload.email; // Store userEmail
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload || "Unexpected error occurred during signup.";
      });
  }
});

export const { resetSignupState } = signupSlice.actions

export default signupSlice.reducer