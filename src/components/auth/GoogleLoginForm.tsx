import { useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, provider, db } from "../Firebase/Firebase";
import { GoogleLogin } from "../apiServices/AccountServices/GoogleLoginServices";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { doc, getDoc, setDoc } from "firebase/firestore";

const MySwal = withReactContent(Swal);

const GoogleLoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [showRoleModal, setShowRoleModal] = useState(false); // Show role modal

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      if (user) {
        const { uid, email, displayName, phoneNumber } = user;
        localStorage.setItem(
          "googleUser",
          JSON.stringify({ uid, email, displayName, phoneNumber })
        );
      }
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const idToken = credential?.idToken;
      console.log("lấy ID Token từ Google!", idToken);
      if (idToken) localStorage.setItem("tokenGoogle", idToken);

      if (!idToken) {
        console.error("Không thể lấy ID Token từ Google!");
        return;
      }

      MySwal.fire({
        title: "Processing...",
        text: "Please wait a moment.",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const fullName = user.displayName;
      if (fullName) setName(fullName);
      let phoneNumber = user.phoneNumber;
      let userRole = "";

      const userDocRef = doc(db, "Users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        userRole = userDocSnap.data().role;
        const numberPhoneFromFirestore = userDocSnap.data().phoneNumber;
        if (numberPhoneFromFirestore) phoneNumber = numberPhoneFromFirestore;
      } else {
        console.log("User document not found!");
      }

      if (userRole) {
        await proceedWithLogin(
          idToken,
          userRole,
          fullName ?? "",
          phoneNumber ?? ""
        );
      } else {
        setShowRoleModal(true);
      }

      Swal.close();
    } catch (error) {
      console.error(error);
      MySwal.fire({
        icon: "error",
        title: "Login Failed",
        text: "An error occurred. Please try again!",
      });
      Swal.close();
    } finally {
      setIsLoading(false);
    }
  };

  const proceedWithLogin = async (
    idToken: string,
    role: string,
    fullName: string,
    phoneNumber: string
  ) => {
    const response = await GoogleLogin(idToken, role, fullName, phoneNumber);
    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      const userId = getUserIdFromToken(accessToken);
      if (userId) {
        localStorage.setItem("userId", userId);
      } else {
        console.warn("Không thể lấy userId từ token");
      }

      Swal.close();

      MySwal.fire({
        icon: "success",
        title: "Login Successful!",
        text: "Redirecting to your profile...",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        localStorage.removeItem("tokenGoogle");
        localStorage.removeItem("googleUser");
        navigate("/");
      });
    } else {
      Swal.close();
      throw new Error("Failed to save user to database");
    }
  };

  const handleRoleSelection = async () => {
    if (!role) {
      MySwal.fire({
        icon: "warning",
        title: "Lỗi",
        text: "Vui lòng chọn vai trò trước khi tiếp tục!",
      });
      return;
    }

    MySwal.fire({
      title: "Processing...",
      text: "Please wait a moment.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    const tokenGoogle = localStorage.getItem("tokenGoogle");
    const storedUser = localStorage.getItem("googleUser");

    if (storedUser) {
      const user = JSON.parse(storedUser);
      console.log("googleUser: ", user);
      await setDoc(
        doc(db, "Users", user.uid),
        {
          email: user.email,
          name: user.displayName,
          role: role,
          phoneNumber: phone,
        },
        { merge: true }
      );
    }

    if (tokenGoogle)
      await proceedWithLogin(tokenGoogle, role, name ?? "", phone);
    setShowRoleModal(false);
    Swal.close();
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
  };

  const handleCloseModal = () => {
    setShowRoleModal(false);
  };

  return (
    <div>
      {/* Hiển thị nút đăng nhập Google */}
      {!showRoleModal && (
        <button
          onClick={handleLogin}
          className="flex items-center justify-center gap-2 p-2 border border-gray-300 rounded-md cursor-pointer"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="#EA4335"
              d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
            />
            <path
              fill="#34A853"
              d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
            />
            <path
              fill="#4A90E2"
              d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5818182 23.1272727,9.90909091 L12,9.90909091 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
            />
            <path
              fill="#FBBC05"
              d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
            />
          </svg>
          <span className="text-sm">
            {isLoading ? "Đang đăng nhập..." : "Đăng nhập với Google"}
          </span>
        </button>
      )}

      {isLoading && <div className="spinner">Loading...</div>}

      {/* Modal for selecting role */}
      {showRoleModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-10">
          <div className="bg-white p-6 rounded-md w-96">
            <h4>Nếu bạn đã đăng ký thì chọn vai trò cho vui thôi hihi</h4>
            <h3 className="text-lg font-semibold mb-4">Chọn vai trò của bạn</h3>
            <select
              onChange={handleRoleChange}
              value={role}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            >
              <option value="">Chọn vai trò</option>
              <option value="worker">Nhân viên</option>
              <option value="employer">Nhà tuyển dụng</option>
            </select>

            <input
              type="tel"
              placeholder="Nhập số điện thoại"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />

            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-md"
              >
                Hủy
              </button>
              <button
                onClick={handleRoleSelection}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoogleLoginForm;
