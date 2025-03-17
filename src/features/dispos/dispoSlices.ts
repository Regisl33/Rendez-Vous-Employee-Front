import api from "../../app/api/api";
import { CreateDispoReqType } from "./types/DispoTypes";

const dispoSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createDispos: builder.mutation({
      query: (dispos: CreateDispoReqType[]) => ({
        url: "/dispos",
        method: "POST",
        body: dispos,
      }),
      invalidatesTags: ["Dispos"],
    }),
  }),
});

export const { useCreateDisposMutation } = dispoSlice;
