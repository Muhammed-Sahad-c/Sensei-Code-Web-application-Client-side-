import { userAxiosInstance } from "../axios/instance";

export const getRandomUserDetails = (email, req_user) => {
  return userAxiosInstance.get("/getrandomuser", {
    headers: { email: email, req_user },
  });
};

export const updateEditedUserDetails = (data) => {
  return userAxiosInstance.post("/updateuserdetails", data);
};

export const updateUserProfile = (data) => {
  return userAxiosInstance.post("/updateimage", data);
};

export const followaUser = (followerEmail, accountEmail) => {
  return userAxiosInstance.post("/followauser", {
    followerEmail,
    accountEmail,
  });
};

export const unfollowaUser = (followerEmail, accountEmail) => {
  return userAxiosInstance.post("/unfollowuser", {
    followerEmail,
    accountEmail,
  });
};
