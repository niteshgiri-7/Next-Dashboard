"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const productFormSchema = z.object({
  name: z.string().min(2, { message: "Product name must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  image: z.string().url({ message: "Please provide a valid image URL." }),
  initialStock: z.coerce.number().int().min(0, { message: "Initial stock must be 0 or more." }),
  inStock: z.coerce.number().int().min(0, { message: "Available stock must be 0 or more." }),
  categoryName: z.string().min(2, { message: "Category name must be at least 2 characters." }),
})

export default function AddProductPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      initialStock: 0,
      inStock: 0,
      categoryName: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof productFormSchema>) => {
    setIsLoading(true)
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      setIsLoading(false)

      if (res.ok) {
        toast("Product added successfully!")
        router.push("/products")
      } else {
        toast("Failed to add product,Invalid Category!")
      }
    } catch (error) {
      setIsLoading(false)
      toast("An error occurred while adding the product.")
      console.log(error)
    }
  }

  return (
    <div className="p-6 lg:w-[30%] h-fit mx-auto lg:border-gray-300 lg:border-2 rounded-lg mt-16 lg:shadow-gray-400 lg:shadow-lg">
      <div>
        <Link href="/products">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold mb-6 mt-2">Add New Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter product name" {...field} />
              </FormControl>
              <FormDescription>Enter the name of your product.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Enter product description" {...field} />
              </FormControl>
              <FormDescription>Provide a short description of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="image" render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter image URL" {...field} />
              </FormControl>
              <FormDescription>Paste a valid image URL for the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="initialStock" render={({ field }) => (
            <FormItem>
              <FormLabel>Initial Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter initial stock" {...field} />
              </FormControl>
              <FormDescription>Set the initial quantity available.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="inStock" render={({ field }) => (
            <FormItem>
              <FormLabel>Available Stock</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter available stock" {...field} />
              </FormControl>
              <FormDescription>Current stock available for sale.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="categoryName" render={({ field }) => (
            <FormItem>
              <FormLabel>Category Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter category name" {...field} />
              </FormControl>
              <FormDescription>Enter the category this product belongs to.</FormDescription>
              <FormMessage />
            </FormItem>
          )} />

          {isLoading ? (
            <Button disabled>
              <Loader2 className="animate-spin" />
              Adding Product...
            </Button>
          ) : (
            <Button type="submit">Add Product</Button>
          )}
        </form>
      </Form>
    </div>
  )
}
