import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { REACT_NATIVE_BASE_URL } from "@env";
import { saveAuthData } from '../../../utils/secureStore';

//Types
interface SignupState {
    loading: boolean;
    loading2: boolean;
    success: boolean;
    error: string | null;
    userId: string | null; // Track user ID
    email: string | null; // Track user email
}
// Initial State
const initialState: SignupState = {
    loading: false,
    loading2: false,
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
            `${REACT_NATIVE_BASE_URL}/api/v1/initiate-signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(SignupPayload),
            }
        );
        console.log("REACT_NATIVE_BASE_URL:", REACT_NATIVE_BASE_URL);

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

interface OtpPayload {
    _id: string;
    otp: string;
}
//Thunk for Verify OTP
export const verifyOtpSignup = createAsyncThunk<
    { message: string },
    OtpPayload,
    { rejectValue: string }
>("auth/verifyOtp", async (OtpPayload, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `${REACT_NATIVE_BASE_URL}/api/v1/verify-otp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(OtpPayload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(
                data.message || "Verification failed. Please try again."
            );
        }

        return { message: data.message };
    } catch (error: any) {
        console.error("Verification Error:", error);
        return rejectWithValue("Something went wrong. Please try agian later.");
    }
});

interface resendOTPPayload {
    _id: string;
    email: string;
}

// Resend OTP Thunk
export const resendOtp = createAsyncThunk<
    { message: string },
    resendOTPPayload,
    { rejectValue: string }
>("auth/resendOtp", async (resendOTPPayload, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `${REACT_NATIVE_BASE_URL}/api/v1/resend-otp`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resendOTPPayload),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            return rejectWithValue(
                data.message || "Resending OTP failed. Please try again."
            );
        }

        return { message: data.message };
    } catch (error: any) {
        console.error("Resend OTP Error:", error);
        return rejectWithValue("Something went wrong. Please try again later.");
    }
});

export interface completeSignupPayload {
    email: string;
    password: string | null;
}
export const completeSignup = createAsyncThunk<
    {
        user: any;
        message: string;
    },
    completeSignupPayload,
    { rejectValue: string }
>("user/completeSignup", async (completeSignupPayload, { rejectWithValue }) => {
    try {
        const response = await fetch(
            `${process.env.REACT_NATIVE_BASE_URL}/api/v1/complete-signup`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(completeSignupPayload),
            }
        );

        const data = await response.json();
        console.log("redux", data);

        if (!response.ok) {
            return rejectWithValue(data.message || "Something went srong!");
        }

        // Convert tokens to strings and save in secure Store
        console.log("saving accessToken");
        await saveAuthData({
            accessToken: data.data.accessToken,
            refreshToken: data.data.refreshToken,
            expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 1 day expiry
        });

        return { user: data.data.user, message: data.message };
    } catch (error: any) {
        console.error("Complete Signup Error:", error);
        return rejectWithValue(error.message || "Network error!");
    }
})

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
            })

            // Verify OTP Thunk
            .addCase(verifyOtpSignup.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(verifyOtpSignup.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(verifyOtpSignup.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                state.error = action.payload || "Resend OTP failed.";
            })

            // Resend OTP Thunk
            .addCase(resendOtp.pending, (state) => {
                state.loading2 = true;
                state.error = null;
                state.success = false;
            })
            .addCase(resendOtp.fulfilled, (state) => {
                state.loading2 = false;
                state.success = true;
            })
            .addCase(resendOtp.rejected, (state, action) => {
                state.loading2 = false;
                state.success = false;
                state.error = action.payload || "Resend OTP failed.";
            });
    }
});

export const { resetSignupState } = signupSlice.actions

export default signupSlice.reducer