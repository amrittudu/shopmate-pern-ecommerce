import axios from "axios";

export const axiosInstance = axios.create({
  
  baseURL: import.meta.env.DEV 
      ? "http://localhost:4000/api/v1"
      : "https://shopmate-client-ft6w.onrender.com/api/v1",

  withCredentials: true,

});
