import type { BooksResponse, IBook, SingleBookResponseI } from '@/types/bookTypes';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';



export const bookApi = createApi({
    reducerPath: 'bookApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }),
    tagTypes: ['Books'],
    endpoints: (builder) => ({
        getBooks: builder.query<BooksResponse, void>({
            query: () => 'books',
            providesTags: ['Books'],
            keepUnusedDataFor: 0,
        }),

        getBookById: builder.query<SingleBookResponseI, string>({
            query: (id) => `books/${id}`,
            providesTags: (_, __, id) => [{ type: 'Books', id }],
        }),


        addBook: builder.mutation<BooksResponse, { title: string; author: string; genre: 'FICTION' | 'NON_FICTION' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY'; isbn: string; description?: string; img?: string; copies: number; available: boolean; }>({
            query: (payload) => ({
                url: 'books',
                method: 'POST',
                body: payload
            })
        }),

        updateBook: builder.mutation<BooksResponse, { id: string; data: Partial<IBook> }>({
            query: ({ id, data }) => ({
                url: `books/${id}`,
                method: "PUT",
                body: data,
            }),
            invalidatesTags: ["Books"],
        }),

        deleteBook: builder.mutation<void, string>({
            query: (id) => ({
                url: `books/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Books'],
        }),


    }),
});

export const { useGetBooksQuery, useUpdateBookMutation, useDeleteBookMutation, useAddBookMutation, useGetBookByIdQuery } = bookApi;
