import { userAxiosInstance } from "../axios/instance.js";

export const postQustion = (question, questionHeading, email, questionTags) => {
  return userAxiosInstance.post("/submitqustion", {
    userMail: email,
    question: question,
    questionTags: questionTags,
    questionHeading: questionHeading,
  });
};

export const getAllQuestions = () => {
  return userAxiosInstance.get("/getQuestions");
};

export const retrieveQuestionDetails = (id, email = null) => {
  return userAxiosInstance.get("/getquestion", {
    headers: { questionId: id, req_email: email },
  });
};

export const InsertNewComment = (data) => {
  return userAxiosInstance.post("/addnewcomment", data);
};

export const updateUserVotes = (data) => {
  return userAxiosInstance.post("/addnewvote", data);
};

export const submitUserAnswers = (data) => {
  return userAxiosInstance.post("/addnewanswer", data);
};

export const getAllAnswers = (questionId) => {
  return userAxiosInstance.get("/getallanswers", { headers: { questionId } });
};

export const updateUserSupport = (data) => {
  return userAxiosInstance.post("/updateusersupport", data);
};

export const updateUserOppose = (data) => {
  return userAxiosInstance.post("/updateuseroppose", data);
};

export const acceptAnswerFromAnswers = (data) => {
  return userAxiosInstance.post("/acceptananswer", data);
};

export const rejectCurrentAcceptedAnswer = (data) => {
  return userAxiosInstance.post("/removeaccepted", data);
};
