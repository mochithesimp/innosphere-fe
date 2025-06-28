import * as request from "../../../utils/request";

interface User {
  roles: string[];
}

export const getUserId = async (userId: string) => {
  try {
    const token = localStorage.getItem("token");
    const res = await request.get(`/api/User/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserCountsByRole = async () => {
  try {
    const users = await request.get('/api/user') as User[]; // GET toàn bộ user

    const totalWorkers = users.filter((u: User) => u.roles.includes("Worker")).length;
    const totalEmployers = users.filter((u: User) => u.roles.includes("Employer")).length;

    return { totalWorkers, totalEmployers };
  } catch (error) {
    console.error("Error fetching users for count:", error);
    return { totalWorkers: 0, totalEmployers: 0 };
  }
};