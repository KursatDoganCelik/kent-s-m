import { useState } from "react";
import axios from "axios";

const useAxios = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const url = `${import.meta.env.VITE_MOCK_API_BASE_URL}`;

  const get = async (endPoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${url}${endPoint}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const post = async (endPoint: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}${endPoint}`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const put = async (endPoint: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${url}${endPoint}`, data);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const del = async (endPoint: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${url}${endPoint}`);
      return response.data;
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, get, post, put, del };
};

export default useAxios;
