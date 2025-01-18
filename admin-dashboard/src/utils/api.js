import axios from "axios";

const apiClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    // Retrieve the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Attach the access token to the Authorization header
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token refresh
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Get the refresh token
        const refreshToken = localStorage.getItem("refreshToken");
        
        if (!refreshToken) {
          // If no refresh token exists, redirect to login
          window.location.href = '/login';
          return Promise.reject(error);
        }

        // Attempt to get a new access token using the refresh token
        const response = await axios.post("/api/refreshtoken", {
          refresh: refreshToken
        });

        if (response.data.Token) {
          const { access, refresh } = response.data.Token;
          
          // Store the new tokens
          localStorage.setItem("accessToken", access);
          localStorage.setItem("refreshToken", refresh);

          // Update the original request with the new token
          originalRequest.headers.Authorization = `Bearer ${access}`;
          
          // Retry the original request
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh token fails, clear tokens and redirect to login
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;