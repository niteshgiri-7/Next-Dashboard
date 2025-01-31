"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useParams } from "next/navigation"

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
import { useEffect, useState } from "react"
import { ArrowLeft, Loader2 } from "lucide-react"
import { toast } from "sonner"
import Link from "next/link"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Category name must be at least 2 characters.",
    }),
    image: z.string().url({
        message: "Please provide a valid URL for the image.",
    }),
})

export default function EditCategoryPage() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { id } = useParams()
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            image: "",
        },
    })

    const router = useRouter()

    const fetchCategory = async () => {
        const res = await fetch(`/api/categories/${id}`)
        const category = await res.json()
        return category
    }

    const populateForm = async () => {
        setIsLoading(true);
        const category = await fetchCategory()
        form.setValue("name", category.name)
        form.setValue("image", category.image)
        setIsLoading(false);
    }

    useEffect(() => {
        populateForm()
    }, [id])

    const onSubmit = async (data: { name: string; image: string }) => {
        const res = await fetch(`/api/categories/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        })

        if (res.ok) {
            toast("Category Updated Successfully!");
            router.push("/categories")
        } else {
            toast("Failed to updated")
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
