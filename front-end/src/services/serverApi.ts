import axios, { AxiosInstance } from "axios"

export const serverApi: AxiosInstance = axios.create({
  baseURL: "http://localhost:8000/api"
})