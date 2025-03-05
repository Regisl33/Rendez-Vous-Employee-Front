import api from "../../app/api/api";
import { AddStore } from "./types/Store";

const storeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createStore: builder.mutation({
      query: (store: AddStore) => ({
        url: "/stores",
        method: "POST",
        body: store,
      }),
      invalidatesTags: ["Stores"],
    }),
  }),
});

export const { useCreateStoreMutation } = storeSlice;
