import axios from "axios";
import { useAuthState } from '@/store/auth'

const axiosBaseInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

axiosBaseInstance.interceptors.request.use(function (config) {
    const auth = useAuthState()
    const token = auth.token
    console.log({auth})
    config.headers['Authorization'] = `Bearer ${token}`
    config.headers['token'] = token
    return config
  })

type HeaderType = {
  "content-type": string;
};

type OptionType<T> = {
  url: string;
  data?: T;
  headers?: HeaderType;
};

async function getRequest({ url }: { url: string }) {
  const response = await axiosBaseInstance.get(url);
  return response?.data || response;
}

async function deleteRequest({ url, data }: { url: string; data?: any }) {
  const response = await axiosBaseInstance.delete(url, data);
  return response?.data || response;
}

async function patchRequest<T>({ url, data }: OptionType<T>) {
  const response = await axiosBaseInstance.patch(url, data);
  return response?.data || response;
}

async function postRequest<T>({
  url,
  data,
  headers = { "content-type": "application/x-www-form-urlencoded" },
}: OptionType<T>) {
  const response = await axiosBaseInstance.post(url, data, {
    headers,
  });
  return response?.data || response;
}

async function putRequest<T>({ url, data }: OptionType<T>) {
  const response = await axiosBaseInstance.put(url, data);
  return response?.data || response;
}

export  {
  getRequest,
  deleteRequest,
  patchRequest,
  postRequest,
  putRequest,
};
