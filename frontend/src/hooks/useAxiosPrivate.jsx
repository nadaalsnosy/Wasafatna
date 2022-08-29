import { useEffect } from "react";
import { axiosPrivate } from "../api/axios";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        config.headers["Authorization"] = `${auth.token}`;
        return config;
      },
      (err) => Promise.reject(err)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
    };
  });
  return axiosPrivate;
};

export default useAxiosPrivate;
