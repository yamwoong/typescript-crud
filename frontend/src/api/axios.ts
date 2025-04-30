import axios, {
    AxiosInstance,
    InternalAxiosRequestConfig
  } from 'axios';
  
  /** Create a reusable Axios instance with base URL and JSON headers (기본 URL 및 JSON 헤더를 가진 재사용 가능한 Axios 인스턴스 생성) */
  export const api: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_API_URL ?? '/api',
    headers: { 'Content-Type': 'application/json' },
  });
  
  /** Attach a request interceptor to include auth token if present (토큰이 있으면 요청 헤더에 자동으로 추가하도록 인터셉터 설정) */
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      const token = localStorage.getItem('token');      // Retrieve token from localStorage (로컬스토리지에서 토큰 조회)
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Add Authorization header (Authorization 헤더 추가)
      }
      return config;
    },
    (error) => Promise.reject(error) // Pass through any request-creation errors
  );
  