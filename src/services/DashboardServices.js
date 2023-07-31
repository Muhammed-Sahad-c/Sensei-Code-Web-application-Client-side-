import { userAxiosInstance } from "../axios/instance.js";

export const getDashboardDetails = (email) => {
  return userAxiosInstance.get("/getdashboardinfo", {
    headers: { email: email },
  });
};
