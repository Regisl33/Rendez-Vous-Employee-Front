import { createEntityAdapter } from "@reduxjs/toolkit";
import api from "../../app/api/api";
import RoleType, { CreateRole, UpdateRole } from "./types/roles";

const rolesAdapter = createEntityAdapter({
  selectId: (role: RoleType) => role.id,
  sortComparer: (a, b) => a.id - b.id,
});

const initialState = rolesAdapter.getInitialState();

const rolesSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getRolesByStore: builder.query({
      query: (id: string) => `/roles/:${id}`,
      transformResponse: (res: RoleType[]) => {
        const rolesData: RoleType[] = res;
        return rolesAdapter.setAll(initialState, rolesData);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id: number) => ({
                type: "Roles" as const,
                id: id,
              })),
              { type: "Roles", id: "ALL" },
            ]
          : [{ type: "Roles", id: "ALL" }],
    }),
    getRoleByID: builder.query({
      query: (id: string) => `/roles/modif/${id}`,
      transformResponse: (res: RoleType) => {
        let currentRole = res;
        return currentRole;
      },
    }),
    createRole: builder.mutation({
      query: (service: CreateRole) => ({
        url: "/roles",
        method: "POST",
        body: service,
      }),
      invalidatesTags: ["Roles"],
    }),
    updateRole: builder.mutation({
      query: ({ updatedRole, id }: UpdateRole) => ({
        url: `/services/:${id}`,
        method: "PATCH",
        body: updatedRole,
      }),
      invalidatesTags: (arg) => [{ type: "Roles", id: arg.id }],
    }),
  }),
});

export const {
  useGetRolesByStoreQuery,
  useGetRoleByIDQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
} = rolesSlice;
