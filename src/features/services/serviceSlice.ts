import { createEntityAdapter } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import { AddService, ServiceType, UpdateServiceType } from "./types/Service";

const servicesAdapter = createEntityAdapter({
  selectId: (service: ServiceType) => service.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = servicesAdapter.getInitialState();

const serviceSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getServiceByStore: builder.query({
      query: (id: string) => `/services/:${id}`,
      transformResponse: (res: ServiceType[]) => {
        const servicesData: ServiceType[] = res;
        return servicesAdapter.setAll(initialState, servicesData);
      },
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
      query: (id: string) => `/services/modif/${id}`,
      transformResponse: (res: ServiceType) => {
        let currentService = res;
        return currentService;
      },
    }),
    createService: builder.mutation({
      query: (service: AddService) => ({
        url: "/services",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Services"],
    }),
    updateService: builder.mutation({
      query: ({ updatedService, id }: UpdateServiceType) => ({
        url: `/services/:${id}`,
        method: "PATCH",
        body: updatedService,
      }),
      invalidatesTags: (arg) => [{ type: "Services", id: arg.id }],
    }),
  }),
});

export const {
  useGetServiceByStoreQuery,
  useCreateServiceMutation,
  useGetServiceByIDQuery,
  useUpdateServiceMutation,
} = serviceSlice;
