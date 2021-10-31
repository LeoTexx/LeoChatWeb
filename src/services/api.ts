import axios from "axios";

const { VITE_WEBSOCKET_URL } = import.meta.env;

export const api = axios.create({
  baseURL: VITE_WEBSOCKET_URL,
});
