import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url = process.env.API_BASE_URL;

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  tagTypes: ["Services"],
  endpoints: (builder) => ({}),
});

export default api;
