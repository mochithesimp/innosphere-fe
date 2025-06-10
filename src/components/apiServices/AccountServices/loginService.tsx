import { AxiosError } from "axios";
import request from "../../../utils/request";

export const login = async (email: string, password: string) => {
  try {
    const res = await request.post("/api/auth/login", { email, password });
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Unexpected error:", error);

      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
};
