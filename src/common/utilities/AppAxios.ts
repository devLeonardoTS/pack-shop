import axios from "axios";

const client = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MAIN_API_BASE_URL,
});

function setAuthHeader(token?: string) {
  if (token) {
    client.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete client.defaults.headers.common.Authorization;
  }
}

export const AppAxios = {
  client,
  setAuthHeader,
};
