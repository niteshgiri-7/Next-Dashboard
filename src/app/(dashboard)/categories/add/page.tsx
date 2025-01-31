"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useState } from "react"
import {  ArrowLeft, Loader2 } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
  image: z.string().url({
    message: "Please provide a valid URL for the image.",
  }),
})

export default function AddCategoryPage() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      image: "",
    },
  })
  const [isloading,setIsLoading] = useState<boolean>(false);
  const router = useRouter()

  const onSubmit = async (data: { name: string; image: string }) => {
    setIsLoading(true);
    const res = await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
     setIsLoading(false);
    if (res.ok) {
      toast("Category added Successfully!");
      router.push("/categories") 
    } else {
      toast("Category already Exists");
    }
  }

  return (
    <div className="p-6 lg:w-[30%] h-fit mx-auto lg:box-border lg:border-gray-300 lg:border-2 rounded-lg mt-16  lg:shadow-gray-400 lg:shadow-lg">
      <div>
      <Link href='/categories'><ArrowLeft /></Link>
      <h1 className="text-2xl font-bold mb-6 mt-2">Add New Category</h1>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Category Name" {...field} />
                </FormControl>
                <FormDescription>
                  Enter the name of category
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input placeholder="Image URL" {...field} />
                </FormControl>
                <FormDescription>
                  Provide a valid URL for the image you want to associate with this category.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {isloading?  <Button disabled>
      <Loader2 className="animate-spin" />
      Please wait
    </Button>:<Button>Add Category</Button>}
        </form>
      </Form>
    </div>
  )
}
