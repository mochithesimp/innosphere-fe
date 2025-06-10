// Validation utility functions for authentication forms

export const validateEmail = (email: string): string => {
    if (!email) {
        return "Email là bắt buộc";
    }
    if (!email.includes("@gmail.com")) {
        return "Email phải có định dạng @gmail.com";
    }
    const emailRegex = /^[^\s@]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
        return "Định dạng email không hợp lệ";
    }
    return "";
};

export const validatePassword = (password: string): string => {
    if (!password) {
        return "Mật khẩu là bắt buộc";
    }
    if (password.length < 6) {
        return "Mật khẩu phải có ít nhất 6 ký tự";
    }
    return "";
};

export const validateConfirmPassword = (password: string, confirmPassword: string): string => {
    if (!confirmPassword) {
        return "Xác nhận mật khẩu là bắt buộc";
    }
    if (password !== confirmPassword) {
        return "Mật khẩu và xác nhận mật khẩu phải giống nhau";
    }
    return "";
};

export const validateFullName = (fullName: string): string => {
    if (!fullName || fullName.trim() === "") {
        return "Họ và tên là bắt buộc";
    }
    if (fullName.trim().length < 2) {
        return "Họ và tên phải có ít nhất 2 ký tự";
    }
    return "";
};

export const validateDisplayName = (displayName: string): string => {
    if (!displayName || displayName.trim() === "") {
        return "Tên hiển thị là bắt buộc";
    }
    if (displayName.trim().length < 2) {
        return "Tên hiển thị phải có ít nhất 2 ký tự";
    }
    return "";
};

export const validatePhoneNumber = (phoneNumber: string): string => {
    if (!phoneNumber) {
        return "Số điện thoại là bắt buộc";
    }
    const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
    if (!phoneRegex.test(phoneNumber)) {
        return "Số điện thoại không hợp lệ";
    }
    return "";
};

export const validateOtp = (otp: string): string => {
    if (!otp) {
        return "Mã OTP là bắt buộc";
    }
    if (otp.length !== 6) {
        return "Mã OTP phải có 6 chữ số";
    }
    if (!/^\d{6}$/.test(otp)) {
        return "Mã OTP chỉ được chứa số";
    }
    return "";
};

export const validateTermsAccepted = (accepted: boolean): string => {
    if (!accepted) {
        return "Bạn phải đồng ý với điều khoản dịch vụ";
    }
    return "";
}; 