import authConfig from "src/configs/auth";
import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:3010/";

const axiosServices = axios.create({
  baseURL,
});

// Function to retrieve the token (implementation depends on your storage mechanism)
const getToken = () => {
  // Replace with your logic to retrieve the token from local storage, cookies, etc.
  // This example assumes a `token` key in local storage
  const storedToken = `Bearer ${window.localStorage.getItem(
    authConfig.storageTokenKeyName,
  )!}`;

  return storedToken;
};

// Request interceptor to add authorization header with token (if available)
axiosServices.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    // Optional: Log request details for debugging
    // console.debug('Making request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
export default axiosServices;
