import axios from "axios";

const axiosMain = axios.create({
  baseURL: "http://18.116.149.185:3452/api/v1",
  // process.env.NODE_ENV === "development"
  //   ? `${process.env.REACT_APP_END_POINT_URL_DEV}/api/v1`
  //   : `${process.env.REACT_APP_END_POINT_URL_PROD}/api/v1`,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosMain;
