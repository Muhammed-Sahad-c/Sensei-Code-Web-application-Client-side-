import { userAxiosInstance } from "../axios/instance";

export const submitSignupData = (client_data) => {
  return userAxiosInstance.post("/signupdatasubmission", client_data);
};

export const verifyOtp = (otp, token) => {
  return userAxiosInstance.get("/verifyotp", {
    headers: { client_otp: otp, token },
  });
};

export const submitSigninData = (client_data) => {
  return userAxiosInstance.get("/signin", { headers: client_data });
};

export const getUserDetails = async () => {
  const response = await userAxiosInstance.get("/getuser");
  return response;
};

export const getOtpDetails = async () => {
  return userAxiosInstance("/getotpdetails");
};
