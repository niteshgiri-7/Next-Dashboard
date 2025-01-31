"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { ProductType } from "@/types/Types"
import Link from "next/link"

const formSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters."),
  description: z.string().min(2, "Description must be at least 2 characters."),
  image: z.string().url("Please provide a valid URL for the image."),
  initialStock: z.number().min(0, "Initial stock must be at least 0."),
  inStock: z.number().min(0, "In stock must be at least 0."),
})

export default function EditProductPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { id } = useParams()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      initialStock: 0,
      inStock: 0,
    },
  })

  const fetchProduct = async () => {
    const res = await fetch(`/api/products/${id}`)
    if (!res.ok) throw new Error("Failed to fetch product")
    return res.json()
  }

  const populateForm = async () => {
    setIsLoading(true)
    try {
      const product = await fetchProduct()
      form.reset(product)
    } catch (error) {
      toast.error("Failed to load product data")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    populateForm()
  }, [id])

  const onSubmit = async (data: Omit<ProductType, "id" | "categoryId" | "categoryName">) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error("Failed to update product")
      toast.success("Product Updated Successfully!")
      router.push("/products")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update product")
    }
  }


  return (
    <>
      {!isLoading ?
        <div className="p-6 w-[30%] mx-auto">
          <div>
          <Link href="/products">
            <ArrowLeft />
          </Link>
            <h1 className="text-2xl font-bold mb-6">Edit Product</h1>
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
                      This is the name of the category. Keep it short and clear.
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
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      Provide a description of the product
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
       <FormField
                control={form.control}
                name="initialStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Stock</FormLabel>
                    <FormControl>
                      <Input placeholder="Initial Stock" {...field} />
                    </FormControl>
                    <FormDescription>
                      Initial Stock
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
                     <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>InStock</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter available stock" {...field} />
                    </FormControl>
                    <FormDescription>
                     inStock
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Update Category</Button>
            </form>
          </Form>
        </div>
        : <div className="h-screen w-full flex justify-center items-center">
          <Loader2 className="h-24 w-24 animate-spin" />
        </div>}
    </>
  )
}
