import type { IBorrow } from "@/types/borrowTypes";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface BorrowResponse {
  success: boolean;
  message: string;
  data: IBorrow;
}

export const borrowApi = createApi({
  reducerPath: "borrowApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/" }),
  endpoints: (builder) => ({
    borrowBook: builder.mutation<BorrowResponse, { book: string; quantity: number; dueDate: string }>({
      query: (payload) => ({
        url: "borrow",
        method: "POST",
        body: payload,
      }),
    }),
    getBorrows: builder.query<BorrowResponse[], void>({
      query: () => "borrow",
    }),
  }),
});

export const { useBorrowBookMutation, useGetBorrowsQuery } = borrowApi;
