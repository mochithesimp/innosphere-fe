import { AxiosError } from "axios";
import request from "../../../utils/request";

export const GoogleLogin = async (
  idToken: string,
  email: string,
  name: string,
  phoneNumber: string
) => {
  try {
    const res = await request.post("/api/auth/login-google", {
      idToken,
      email,
      name,
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
