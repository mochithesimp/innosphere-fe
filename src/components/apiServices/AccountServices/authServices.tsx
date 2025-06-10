import { AxiosError } from "axios";
import request from "../../../utils/request";

// Login service
export const login = async (email: string, password: string) => {
    try {
        const res = await request.post("/api/auth/login", { email, password });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Login error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Register Worker service
export const registerWorker = async (registerData: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    avatarUrl?: string;
    address?: string;
}) => {
    try {
        const res = await request.post("/api/auth/register-worker", registerData);
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Register worker error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Register Employer service
export const registerEmployer = async (registerData: {
    email: string;
    password: string;
    fullName: string;
    phoneNumber: string;
    avatarUrl?: string;
    address?: string;
}) => {
    try {
        const res = await request.post("/api/auth/register-employer", registerData);
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Register employer error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Verify Email OTP service
export const verifyEmailOtp = async (email: string, otp: string) => {
    try {
        const res = await request.post("/api/auth/verify-email-otp", { email, otp });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Verify email OTP error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Resend Email OTP service
export const resendEmailOtp = async (email: string) => {
    try {
        const res = await request.post("/api/auth/resend-email-otp", { email });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Resend email OTP error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Forgot Password service
export const forgotPassword = async (email: string) => {
    try {
        const res = await request.post("/api/auth/forgot-password", `"${email}"`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Forgot password error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Reset Password by OTP service
export const resetPasswordByOtp = async (email: string, otp: string, newPassword: string) => {
    try {
        const res = await request.post("/api/auth/reset-password-by-otp", {
            email,
            otp,
            newPassword,
        });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Reset password by OTP error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
};

// Logout service
export const logout = async () => {
    try {
        const token = localStorage.getItem("token");
        const res = await request.post("/api/auth/logout", {}, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        return res;
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error("Logout error:", error);
            throw error;
        } else {
            console.error("Unexpected error:", error);
            throw error;
        }
    }
}; 