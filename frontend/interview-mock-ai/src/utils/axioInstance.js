import axios, { Axios } from "axios";
import { BASE_URL } from "./apiPaths";

const axiosInstance=axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
    },

});


//Request Interceptor

axiosInstance.interceptors.request.use(
    (config) =>
    {
        const accessToken=localStorage.getItem("token");
        if(accessToken)
        {
            config.headers.Authorization=`Bearer ${accessToken}`;
        }
        return config;
    },
    (error) =>
    {
        return Promise.reject(error);
    }
);

//Response Interceptor
axiosInstance.interceptors.response.use(
    (response) =>
    {
        return response;
    },
    (error) =>
    {
        //Handle common erros globally
        if(error.response)
        {
            if(error.response.status === 401)
            {
                window.location.href=("/");
            }
            else if(error.response.status === 500)
            {
                console.error("Request Timeout.Please try again");
            }
            
        }
        else if(error.code === "ECONNABORTED")
        { 
            console.error("Request Timeout. Please try again.")
        }

        return Promise.reject(error);
    }
);
export default axiosInstance;
