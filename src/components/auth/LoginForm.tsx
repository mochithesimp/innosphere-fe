import React, { useState } from "react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { useNavigate } from "react-router-dom";
import { login } from "../apiServices/AccountServices/authServices";
import swal from "sweetalert";
import { getRoleFromToken, getUserIdFromToken } from "../../utils/jwtHelper";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { validateEmail, validatePassword } from "../../utils/validation";
import GoogleLoginForm from "./GoogleLoginForm";
import { EmployerService } from "../../services/employerService";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLoginClick = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate email
    const emailValidationError = validateEmail(email);
    setEmailError(emailValidationError);

    // Validate password
    const passwordValidationError = validatePassword(password);
    setPasswordError(passwordValidationError);

    if (emailValidationError || passwordValidationError) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await login(email, password);

      if (response?.status === 200) {
        const { accessToken, refreshToken } = response.data;

        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        const userId = getUserIdFromToken(accessToken);
        if (userId) {
          localStorage.setItem("userId", userId);
          console.log("Stored userId in localStorage:", userId);
        } else {
          console.warn("Could not extract userId from token");
        }

        const role = getRoleFromToken(accessToken);

        // Navigate based on role
        if (role === "Admin") {
          navigate("/admin/dashboard");
        } else if (role === "Worker") {
          navigate("/employee/dashboard");
        } else if (role === "Employer") {
          // Check if employer profile exists
          try {
            await EmployerService.getProfile();
            // If profile exists, navigate to dashboard
            navigate("/employer/dashboard");
          } catch (profileError) {
            if (profileError instanceof AxiosError && profileError.response?.status === 404) {
              // If profile doesn't exist (404), navigate to setup
              navigate("/employer/business-info");
            } else {
              // If other error, navigate to setup anyway
              navigate("/employer/business-info");
            }
          }
        } else {
          navigate("/");
        }

        toast.success("Đăng nhập thành công!");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 403) {
          swal({
            title: "Tài khoản bị cấm",
            text: "Tài khoản của bạn đã bị cấm vĩnh viễn và không thể đăng nhập.",
            icon: "error",
            buttons: {
              ok: {
                text: "OK",
                value: true,
                className: "swal-ok-button",
              },
            },
          });
        } else if (
          error.response?.status === 400 ||
          error.response?.status === 401
        ) {
          swal(
            "Lỗi xác thực",
            "Tài khoản hoặc mật khẩu không chính xác",
            "error"
          );
        } else {
          console.error("Login failed:", error.response?.status);
          toast.error("Đăng nhập thất bại. Vui lòng thử lại.");
        }
      } else {
        console.error("An error occurred:", error);
        toast.error("Đã xảy ra lỗi không mong muốn. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgot-password");
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="text-left">
        <h1 className="text-2xl font-bold mb-1">Đăng nhập</h1>
        <div className="text-sm text-gray-600">
          Không có tài khoản?
          <a
            href="#"
            className="text-[#309689] hover:underline ml-1"
            onClick={(e) => {
              e.preventDefault();
              handleRegisterClick();
            }}
          >
            Tạo tài khoản
          </a>
        </div>
      </div>

      {/* Email field */}
      <div className="flex flex-wrap">
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          placeholder="Địa chỉ Email"
          className="w-full p-3"
          required
        />
        {emailError && (
          <span className="text-red-500 absolute mt-10">{emailError}</span>
        )}
      </div>

      {/* Password field */}
      <div>
        <div className="relative flex flex-wrap">
          <Input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) setPasswordError("");
            }}
            placeholder="Mật khẩu"
            className="w-full p-3 pr-10"
            required
          />
          <button
            className="absolute inset-y-0 right-0 flex items-center pr-3 m-2"
            type="button"
            onClick={togglePasswordVisibility}
          >
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  showPassword
                    ? "M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    : "M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                }
              />
            </svg>
          </button>
        </div>
        {passwordError && (
          <span className="text-red-500 absolute left-0 ml-56">{passwordError}</span>
        )}
      </div>

      {/* Remember me and forgot password */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 mt-2">
          <Checkbox id="remember" className="mt-0" />
          <label htmlFor="remember" className="text-sm text-gray-600">
            Ghi nhớ tôi
          </label>
        </div>
        <a
          href="#"
          className="text-sm text-[#309689] hover:underline mt-2"
          onClick={(e) => {
            e.preventDefault();
            handleForgotPasswordClick();
          }}
        >
          Quên mật khẩu
        </a>
      </div>

      {/* Submit button */}
      <a
        href="#"
        onClick={handleLoginClick}
        className="block w-full bg-[#309689] text-white rounded-md text-center py-3 font-medium"
      >
        <div className="flex items-center justify-center">
          {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          {!isLoading && (
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          )}
        </div>
      </a>

      {/* Divider */}
      <div className="relative flex items-center justify-center my-4">
        <div className="border-t border-gray-300 w-full"></div>
        <span className="bg-white px-3 text-sm text-gray-500 absolute">
          hoặc
        </span>
      </div>

      {/* Social login buttons */}
      <div className="grid grid-cols-2 gap-4">
        <button className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md hover:bg-gray-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-blue-600"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12c0 6.016 4.432 10.984 10.206 11.852V15.18h-3.008v-3.154h3.008V9.927c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.154h-2.796v8.672C19.568 22.984 24 18.016 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          <span className="text-sm">Đăng nhập với Facebook</span>
        </button>
        <GoogleLoginForm />
      </div>
    </div>
  );
};

export default LoginForm;
