import App from "@/App";
import AddBook from "@/pages/addBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import SingleBook from "@/pages/bookDetails/SingleBook";
import BorrowSummary from "@/pages/borrowBook/BorrowSummary";
import Home from "@/pages/home/Home";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App></App>,
        children : [
         {
            path : '/',
            element : <Home/>
         },
         {
            path : '/books',
            element : <AllBooks></AllBooks>
         },
         {
            path : '/create-book',
            element : <AddBook></AddBook>
         },
         {
            path : '/borrow-summary',
            element : <BorrowSummary></BorrowSummary>
         },
         {
            path : '/books/:id',
            element : <SingleBook></SingleBook>
         }
        ]
    }
])

export default router