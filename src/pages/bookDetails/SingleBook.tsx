import { Link, useParams } from "react-router";
import { useGetBookByIdQuery } from "@/redux/features/books/bookApi";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SingleBookDetails() {
  const { id } = useParams<{ id: string }>();
 const { data : res, isLoading, error } = useGetBookByIdQuery(id!);

 const book = res?.data

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
      </div>
    );
  }
console.log(book);
  if (error || !book) {
    return <p className="text-center text-red-500 mt-10">Failed to load book details.</p>;
  }

  return (
   
    <div className="mt-30 max-w-3xl mx-auto p-6 bg-white dark:bg-zinc-900 shadow-md rounded-xl text-gray-800 dark:text-white">
      <div className="flex flex-col md:flex-row gap-6">
        {book.img ? (
          <img
            src={book.img}
            alt={book.title}
            className="w-full md:w-64 h-auto object-cover rounded-md"
          />
        ) : (
          <div className="w-full md:w-64 h-64 bg-gray-300 dark:bg-zinc-700 rounded-md flex items-center justify-center">
            <span className="text-gray-600 dark:text-gray-300">No Image</span>
          </div>
        )}

        <div className="flex-1 space-y-2">
          <h2 className="text-3xl font-semibold">{book.title}</h2>
          <p><span className="font-semibold">Author:</span> {book.author}</p>
          <p><span className="font-semibold">Genre:</span> {book.genre}</p>
          <p><span className="font-semibold">ISBN:</span> {book.isbn}</p>
          <p><span className="font-semibold">Copies:</span> {book.copies}</p>
          <p><span className="font-semibold">Available:</span> {book.available ? "Yes" : "No"}</p>
          {book.description && (
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              <span className="font-semibold">Description:</span> {book.description}
            </p>
          )}

          <div className="mt-6">
            <Link to="/books"><Button className="w-full md:w-auto cursor-pointer">Borrow Book</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}
