import { useState } from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import type { IBook } from "@/types/bookTypes";
import { useDeleteBookMutation, useGetBooksQuery, useUpdateBookMutation } from "@/redux/features/books/bookApi";
import { BookOpenText, PencilIcon, Trash2Icon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useBorrowBookMutation } from "@/redux/features/borrow/borrowApi";




const AllBooks = () => {
    const [editBook, setEditBook] = useState<IBook | null>(null);
    const [formData, setFormData] = useState<Partial<IBook>>({});
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [bookToDelete, setBookToDelete] = useState<IBook | null>(null);
    const [borrowDialogOpen, setBorrowDialogOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState<IBook | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [dueDate, setDueDate] = useState("");


    const [deleteBook] = useDeleteBookMutation();
    const { data, isLoading } = useGetBooksQuery();
    const [updateBook] = useUpdateBookMutation();
    const [borrowBook] = useBorrowBookMutation();

    const navigate = useNavigate();


    const handleEditClick = (book: IBook) => {
        setEditBook(book);
        setFormData(book);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editBook && formData) {
            await updateBook({ id: editBook._id, data: formData });
            setEditBook(null);
        }
    };

    const handleDeleteClick = (book: IBook) => {
        setBookToDelete(book);
        setDeleteDialogOpen(true);
    };

    const confirmDelete = async () => {
        if (bookToDelete) {
            await deleteBook(bookToDelete._id);
            setDeleteDialogOpen(false);
            toast.success("✅ Book deleted successfully!");
        }
    };


    if (isLoading) return <Progress value={85} className="w-1/4 h-4 my-[50vh] mx-auto" />;
    const books = data?.data;

    return (
        <div className="mt-30">
            <h2 className="my-8 font-semibold text-3xl text-center">A list of all books</h2>
            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Genre</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Copies</TableHead>
                        <TableHead>Available</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {books?.map((book) => (
                        <TableRow key={book.isbn}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{book.author}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>{book.isbn}</TableCell>
                            <TableCell>{book.copies}</TableCell>
                            <TableCell>
                                <span className={book.available ? "text-green-600" : "text-red-600"}>
                                    {book.available ? "Yes" : "No"}
                                </span>
                            </TableCell>
                            <TableCell className="space-x-2">

                                <Button
                                    size="sm"
                                    className="cursor-pointer bg-gray-600"
                                    onClick={() => handleEditClick(book)}
                                >
                                    <PencilIcon />
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    className="cursor-pointer hover:bg-red-900"
                                    onClick={() => handleDeleteClick(book)}
                                >
                                    <Trash2Icon />
                                </Button>
                                <Button
                                    className="cursor-pointer hover:bg-green-900 bg-green-600"
                                    size="sm"
                                    onClick={() => {
                                        setSelectedBook(book);
                                        setBorrowDialogOpen(true);
                                    }}
                                >
                                    Borrow<BookOpenText />
                                </Button>
                            </TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Edit Dialog */}
            <Dialog open={!!editBook} onOpenChange={() => setEditBook(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Edit Book</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Input
                            placeholder="Title"
                            value={formData.title || ""}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                        <Input
                            placeholder="Author"
                            value={formData.author || ""}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        />
                        <Select
                            value={formData.genre || ""}
                            onValueChange={(value) =>
                                setFormData({ ...formData, genre: value as IBook["genre"] })
                            }
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Genre" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="FICTION">Fiction</SelectItem>
                                <SelectItem value="NON_FICTION">Non-Fiction</SelectItem>
                                <SelectItem value="SCIENCE">Science</SelectItem>
                                <SelectItem value="HISTORY">History</SelectItem>
                                <SelectItem value="BIOGRAPHY">Biography</SelectItem>
                                <SelectItem value="FANTASY">Fantasy</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder="ISBN"
                            value={formData.isbn || ""}
                            onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        />
                        <Input
                            type="number"
                            placeholder="Copies"
                            value={formData.copies || ""}
                            onChange={(e) => setFormData({ ...formData, copies: +e.target.value })}
                        />
                        <Button type="submit" className="w-full cursor-pointer">
                            Save Changes
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

            {/* delte alert dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this book?</AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete}>Yes, Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>


            {/* borrow open dialog */}
            <Dialog open={borrowDialogOpen} onOpenChange={setBorrowDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Borrow Book</DialogTitle>
                    </DialogHeader>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (!selectedBook) return;
                            try {
                                await borrowBook({
                                    book: selectedBook._id,
                                    quantity,
                                    dueDate,
                                }).unwrap();
                                toast.success("📚 Book borrowed successfully!");
                                navigate("/borrow-summary");
                               
                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                            } catch (error : any) {
                                console.log(error);
                                const errorMsg = error?.data?.message || "❌ Borrow failed";
                                toast.error(errorMsg);
                            }
                        }}
                        className="space-y-4"
                    > 
                    <label>Quantity</label>
                        <Input
                            type="number"
                            placeholder="Quantity"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(+e.target.value)}
                        />
                         <label>Due date</label>
                        <Input
                            type="date"
                            placeholder="Due Date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                        />
                        <Button type="submit" className="w-full cursor-pointer hover:bg-black hover:text-white">
                            Confirm Borrow
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>

        </div>
    );
};




export default AllBooks;


