import type { IBorrow, IBorrows } from "@/types/borrowTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BorrowResponse {
  success: boolean;
  message: string;
  data: IBorrow;
}

interface IBorrowResponse {
  success: boolean;
  data: IBorrows[];  // data property is an array of IBorrow
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://library-ms-assignment-backend.vercel.app/api/" }),
  tagTypes: ["BorrowSummary"],
  endpoints: (builder) => ({
    borrowBook: builder.mutation<BorrowResponse, { book: string; quantity: number; dueDate: string }>({
      query: (payload) => ({
        url: "borrow",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["BorrowSummary"],
    }),
    getBorrows: builder.query<IBorrowResponse, void>({
      query: () => "borrow",
      providesTags: ["BorrowSummary"]
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowsQuery } = borrowApi;
