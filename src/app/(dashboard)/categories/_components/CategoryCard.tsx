"use client";

import { Card, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";

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

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    image: string;
  };
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/categories/${category.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
         toast("Category Deleted Successfully!");
        router.push("/categories");
      } else {
        toast("Failed to delete category!")
      }
    } catch (error) {
      console.error(error);
      alert("Error deleting category");
    }
  };

  return (
    <Card className="w-[250px] overflow-hidden flex flex-col">
      <div className="relative w-full h-[150px]">
        <Image
          src={category.image}
          alt={category.name}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>

      <CardHeader className="px-4 py-2">
        <CardTitle className="text-lg">{category.name}</CardTitle>
      </CardHeader>

      <CardFooter className="mt-auto flex justify-end space-x-2 p-4">
        <Button
          onClick={() => router.push(`/categories/edit/${category.id}`)}
          variant="outline"
          size="sm"
        >
          <Edit />
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
                This action cannot be undone. This will delete your category.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-red-600"
                onClick={handleDelete}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
