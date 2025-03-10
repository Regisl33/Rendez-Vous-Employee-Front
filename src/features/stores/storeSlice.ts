import { createEntityAdapter } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import StoreType, { AddStore, UpdatedStoreType } from "./types/Store";

const storeAdapter = createEntityAdapter({
  selectId: (store: StoreType) => store.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = storeAdapter.getInitialState();

const storeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllStores: builder.query({
      query: () => "/stores",
      transformResponse: (res: StoreType[]) => {
        const storesData: StoreType[] = res;
        return storeAdapter.setAll(initialState, storesData);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id: number) => ({
                type: "Stores" as const,
                id: id,
              })),
              { type: "Stores", id: "ALL" },
            ]
          : [{ type: "Stores", id: "ALL" }],
    }),
    getStoreByID: builder.query({
      query: (id: string) => `/stores/${id}`,
      transformResponse: (res: StoreType) => {
        let currentService = res;
        return currentService;
      },
    }),
    createStore: builder.mutation({
      query: (store: AddStore) => ({
        url: "/stores",
        method: "POST",
        body: store,
      }),
      invalidatesTags: ["Stores"],
    }),
    updateService: builder.mutation({
      query: ({ updatedStore, id }: UpdatedStoreType) => ({
        url: `/stores/:${id}`,
        method: "PATCH",
        body: updatedStore,
      }),
      invalidatesTags: (arg) => [{ type: "Stores", id: arg.id }],
    }),
  }),
});

export const { useCreateStoreMutation } = storeSlice;
