import axios from "axios";

const api = axios.create({
    baseURL: 'http://http://localhost:8080/swagger-ui/index.html/',
  });

  
  const handleBefore = (config) => {
    const token = localStorage.getItem("token")?.replaceAll('"', "");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  };
  
  const handleError = (error) => {
    console.log(error);
  };
  
  api.interceptors.request.use(handleBefore, handleError);

  export default api;