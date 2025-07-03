import type { IBook } from '@/types/bookTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


interface BooksResponse {
  success: boolean;
  message: string;
  data: IBook[];
}


export const bookApi = createApi({
  reducerPath: 'bookApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
  endpoints: (builder) => ({
    getBooks: builder.query<BooksResponse, void>({
      query: () => 'books',
    }),
  }),
});

export const { useGetBooksQuery } = bookApi;
