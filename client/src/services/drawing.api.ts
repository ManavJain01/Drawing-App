import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from './api';

export const apiDraw = createApi({
  reducerPath: "apiDraw",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Draws APIs
    saveDraw: builder.mutation({
      query: (data) => ({
        url: 'draw',
        method: 'POST',
        body: data,
      }),
    }),
    getDrawById: builder.mutation<User, string>({
      query: (id) => ({
        url: `draw/${id}`,
        method: 'GET',
      }),
    }),
    updateDraw: builder.mutation({
      query: ({id, ...data}) => ({
        url: `draw/${id}`,
        method: 'PUT',
        body: data
      }),
    }),
    deleteDraw: builder.mutation({
      query: (id) => ({
        url: `draw/${id}`,
        method: 'DELETE'
      }),
    })
  }),
});

export const { 
  // Draws
  useSaveDrawMutation, useGetDrawByIdMutation, useUpdateDrawMutation, useDeleteDrawMutation
 } = apiDraw;
