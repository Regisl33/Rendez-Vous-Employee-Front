import api from "../../api/api";
import AddService from "../../types/Service";

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service: AddService) => ({
        url: "/services",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const { useCreateServiceMutation } = serviceSlice;
