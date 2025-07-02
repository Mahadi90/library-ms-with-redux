import App from "@/App";
import AddBook from "@/pages/addBook/AddBook";
import AllBooks from "@/pages/AllBooks/AllBooks";
import BorrowSummary from "@/pages/borrowBook/BorrowSummary";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path : '/',
        element : <App></App>,
        children : [
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
         }
        ]
    }
])

export default router