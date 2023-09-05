import Axios from "axios";

const axios = Axios.create({
  headers: {
    Accept: "appplication/json",
  },
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

export default axios;
