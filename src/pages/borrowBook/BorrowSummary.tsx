import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useGetBorrowsQuery } from "@/redux/features/borrow/borrowApi";
import { Loader2 } from "lucide-react";

const BorrowSummary = () => {
    const { data, isLoading, isError } = useGetBorrowsQuery();

    console.log(data);
    if (isLoading) return <div className="my-52 flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6" />
    </div>;
    if (isError) return <p>Failed to load borrow summary.</p>;



    return (

        <div className="p-8 mt-24 min-h-[80vh]">
            <h2 className="text-3xl font-semibold mb-6 text-center">Borrow Summary</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>ISBN</TableHead>
                        <TableHead>Total Quantity Borrowed</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data?.data.map((item) => (
                        <TableRow key={item?.book?.isbn}>
                            <TableCell>{item?.book?.title}</TableCell>
                            <TableCell>{item?.book?.isbn}</TableCell>
                            <TableCell>{item?.totalQuantity}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default BorrowSummary;
