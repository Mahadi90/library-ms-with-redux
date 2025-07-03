
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useGetBooksQuery } from "@/redux/features/books/bookApi";
import { Link } from "react-router";


const Booklist = () => {
    const { data, isLoading, isError, error } = useGetBooksQuery()
    const books = data?.data;
    if (isLoading) return <Progress className="w-1/4 h-4 mb-96 mx-auto" value={80}></Progress>
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isError) return <p className="text-red-500">Error: {(error as any)?.message}</p>;

    return (
        <div>
            <h2 className="my-12 text-3xl font-bold text-center">Here our booklist</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-12 p-4">
            
            {books?.map((book) => (
                <div key={book.isbn} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow transition-transform duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-400">
                    <img  src={book.img} alt={book.title} className="w-full h-40 md:h-70  object-cover rounded" />
                    <h2 className="text-xl font-semibold mt-2">{book.title}</h2>
                    <p className="text-sm text-gray-600">Author: {book.author}</p>
                    <p className="text-sm text-gray-500 mt-1">{book.genre}</p>
                    <Link  to="/books"><Button className="cursor-pointer mt-2">Borrow Now</Button></Link>
                </div>
            ))}
        </div>
        </div>
    )
};

export default Booklist;