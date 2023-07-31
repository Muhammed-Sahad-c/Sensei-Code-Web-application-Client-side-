import axios from "axios";
import { userAxiosInstance } from "../axios/instance";

export const getDetailsFromGoogle = (access_token) => {
  try {
    return axios.get(
      `${process.env.REACT_APP_GOOGLE_API}access_token=${access_token}`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );
  } catch (err) {
    return null;
  }
};

export const signUpWithGoogleDetails = async (client_data) => {
  return userAxiosInstance.post("/signupGoogle", client_data);
};

export const signinwithgoogle = (email) => {
  return userAxiosInstance.get("/signinwithgoogle", {
    headers: { email: email },
  });
};
