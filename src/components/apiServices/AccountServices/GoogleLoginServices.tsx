import { AxiosError } from "axios";
import request from "../../../utils/request";

export const GoogleLogin = async (
  idToken: string,
  type: string,
  fullName: string,
  phoneNumber: string
) => {
  try {
    const res = await request.post("/api/auth/login-google", {
      idToken,
      type,
      fullName,
      phoneNumber,
    });
    console.log("check data search: ", res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
