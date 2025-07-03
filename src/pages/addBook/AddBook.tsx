import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAddBookMutation } from "@/redux/features/books/bookApi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { IBook } from "@/types/bookTypes";



export default function AddBook() {
  const { register, handleSubmit, reset } = useForm<IBook>();
  const [addBook, { isLoading }] = useAddBookMutation();
  const navigate = useNavigate();

  const onSubmit = async (data: IBook) => {
    const payload = {
      ...data,
      copies: Number(data.copies),
      available: true,
    };

    try {
      await addBook(payload).unwrap();
      toast.success("Book added successfully!");
      reset();
      navigate("/books");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add book.");
    }
  };

  return (
    <div className="mt-30 max-w-2xl mx-auto p-6 rounded-xl shadow-md bg-white dark:bg-zinc-900 dark:text-white">
      <h2 className="text-2xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Title" {...register("title", { required: true })} />
        <Input placeholder="Author" {...register("author", { required: true })} />

        <select
          {...register("genre", { required: true })}
          className="w-full border border-gray-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white rounded-lg p-2 focus:outline-none"
        >
          <option value="">Select Genre</option>
          <option value="FICTION">FICTION</option>
          <option value="NON_FICTION">NON_FICTION</option>
          <option value="SCIENCE">SCIENCE</option>
          <option value="HISTORY">HISTORY</option>
          <option value="BIOGRAPHY">BIOGRAPHY</option>
          <option value="FANTASY">FANTASY</option>
        </select>

        <Input placeholder="ISBN" {...register("isbn", { required: true })} />
        <Input placeholder="Image URL (optional)" {...register("img")} />
        <Textarea placeholder="Description (optional)" {...register("description")} />
        <Input
          type="number"
          placeholder="Number of Copies"
          {...register("copies", { required: true, min: 1 })}
        />

        <Button type="submit" className="w-full cursor-pointer" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
}
