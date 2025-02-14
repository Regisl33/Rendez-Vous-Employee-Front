import api from "../../api/api";
import { AddService, ServiceType } from "../../types/Service";
import { createEntityAdapter } from "@reduxjs/toolkit";

const servicesAdapter = createEntityAdapter({
  selectId: (service: ServiceType) => service._id,
});

const initialState = servicesAdapter.getInitialState();

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getServiceByStore: builder.query({
      query: (id: string) => ({
        url: `/services/:${id}`,
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
    getServiceByID: builder.query({
      query: (id: string) => ({
        url: `/services/:${id}}`,
        transformResponse: (res: ServiceType) => {
          let currentService = res;
          return currentService;
        },
      }),
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
