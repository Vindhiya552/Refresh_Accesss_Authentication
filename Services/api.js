import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

/* ===============================
   AXIOS INTERCEPTOR (CORE LOGIC)
   =============================== */

// let isRefreshing = false;
// let failedQueue = [];

// const processQueue = (error) => {
//   alert("1");
//   failedQueue.forEach((prom) => {
//     if (error) prom.reject(error);
//     else prom.resolve();
//   });
//   failedQueue = [];
// };

// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     alert("2");
//     //  If NOT auth error → just reject
//     if (!error.response || error.response.status !== 401) {
//       return Promise.reject(error);
//     }

//     // Prevent infinite loop
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     originalRequest._retry = true;

//     //  If refresh already happening → wait
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           resolve: () => resolve(api(originalRequest)),
//           reject,
//         });
//       });
//     }

//     isRefreshing = true;

//     try {
//       //  Refresh token call
//       await api.post("/auth/refresh");
//       alert("3");
//       isRefreshing = false;
//       processQueue(null);

//       //  Retry original request
//       return api(originalRequest);
//     } catch (refreshError) {
//       isRefreshing = false;
//       processQueue(refreshError);

//       // Refresh failed → force login
//       window.location.href = "/login";

//       return Promise.reject(refreshError);
//     }
//   }
// );

// api.interceptors.response.use(
//   (response) => response, // If the response is OK, just pass it through.
//   async (error) => {
//     const originalRequest = error.config;
//     // alert("1");
//     //  Do NOT intercept auth routes (avoid infinite loops / recursion)
//     if (
//       originalRequest.url.includes("/auth/check") ||
//       originalRequest.url.includes("/auth/refresh")
//     ) {
//       // alert("2");
//       return Promise.reject(error);
//     }

//     // If it's not a 401, let the error bubble up to the caller
//     if (!error.response || error.response.status !== 401) {
//       return Promise.reject(error);
//     }

//     // Prevent retry loops on the same request
//     if (originalRequest._retry) {
//       return Promise.reject(error);
//     }

//     // Mark the request as having been retried once
//     originalRequest._retry = true;

//     // If a token refresh is already happening, queue this request
//     if (isRefreshing) {
//       return new Promise((resolve, reject) => {
//         failedQueue.push({
//           // When refresh completes, retry the original request
//           resolve: () => resolve(api(originalRequest)),
//           reject, // If refresh fails, reject this queued request too
//         });
//       });
//     }

//     // No current refresh → start one
//     isRefreshing = true;

//     try {
//       //  This is where you’d actually refresh the token:
//       // await api.post("/auth/refresh");

//       isRefreshing = false;

//       //  Tell all queued requests the refresh succeeded
//       processQueue(null);

//       // Retry the original failed request
//       return api(originalRequest);
//     } catch (refreshError) {
//       isRefreshing = false;

//       //  Tell queued requests the refresh failed
//       processQueue(refreshError);

//       //  Redirect to login because refresh failed (user may need to re-auth)
//       window.location.href = "/login";

//       return Promise.reject(refreshError);
//     }
//   }
// );

export default api;
