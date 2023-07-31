import axios from "axios";

export const compileCode = async (formData) => {
  try {
    // const response = await axios.get(
    //   "https://judge0-ce.p.rapidapi.com/languages",
    //   {
    //     headers: {
    //       "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
    //       "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY, // Replace with your RapidAPI key
    //     },
    //   }
    // );

    // console.log(response);
    const rapidApiOptionsForToken = {
      method: "POST",
      url: "https://judge0-ce.p.rapidapi.com/submissions",
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
      data: formData,
    };

    const tokenResponse = await axios.request(rapidApiOptionsForToken);

    const token = tokenResponse.data.token;

    console.log("token", token);
    const rapidApiOptionsForCodeoutput = {
      method: "GET",
      url: `https://judge0-ce.p.rapidapi.com/submissions/${token}`,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
      },
    };

    const outputResponse = await axios.request(rapidApiOptionsForCodeoutput);

    return outputResponse;
  } catch (error) {
    return null;
  }
};
