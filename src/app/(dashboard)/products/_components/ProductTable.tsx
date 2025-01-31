"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ProductType } from "@/types/Types";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ProductTable({ products }: { products: ProductType[] }) {

 const router = useRouter();

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast("Product Deleted Successfully!!");
        router.push("/products");
      } else {
         toast("Failed to Delete")
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting product");
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table className="min-w-full">
        <TableHeader>
          <TableRow className="text-center">
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">Description</TableHead>
            <TableHead>Initial Stock</TableHead>
            <TableHead>InStock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Image
                  src={product.image || "/asdf"}
                  alt={product.name}
                  width={100}
                  height={50}
                  objectFit="contain"
                  className="rounded-t-lg"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell className="hidden md:table-cell">{product.description}</TableCell>
              <TableCell>{product.initialStock}</TableCell>
              <TableCell>{product.inStock}</TableCell>
              <TableCell>{product.categoryName}</TableCell>
              <TableCell>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/products/edit/${product.id}`}>
                      <Edit className="mr-2 h-4 w-4" />
                    </Link>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger>
                      <Button variant="destructive">
                        <Trash2 />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="w-[400px] rounded-xl">
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will delete your product.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600"
                          onClick={() => handleDelete(product.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
