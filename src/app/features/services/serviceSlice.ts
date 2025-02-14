import api from "../../api/api";
import { AddService, ServiceType } from "../../types/Service";
import { createEntityAdapter } from "@reduxjs/toolkit";

const servicesAdapter = createEntityAdapter({
  selectId: (service: ServiceType) => service._id,
});

const initialState = servicesAdapter.getInitialState();

//We will get that value dynamicly later
const storeID = "1234";

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getServiceByStore: builder.query({
      query: () => ({
        url: `/services/:${storeID}`,
        transformResponse: (res: ServiceType[]) => {
          const servicesData = res;
          return servicesAdapter.setAll(initialState, servicesData);
        },
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id: number) => ({
                type: "Services" as const,
                id: id,
              })),
              { type: "Services", id: "ALL" },
            ]
          : [{ type: "Services", id: "ALL" }],
    }),
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

export const { useGetServiceByStoreQuery, useCreateServiceMutation } =
  serviceSlice;
