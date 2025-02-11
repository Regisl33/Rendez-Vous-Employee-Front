import api from "../../api/api";
import Service from "../../types/Service";

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service: Service) => ({
        url: "/services",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
});

export const { useCreateServiceMutation } = serviceSlice;
