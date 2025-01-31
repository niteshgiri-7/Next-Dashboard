import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { categories, products } from "@/app/lib/db/schema"
import { db } from "@/app/lib/db"

export async function GET(req: Request, { params }: { params: Record<string, string> }) {
  try {
    const product = await db
      .select({
        id: products.id,
        name: products.name,
        image: products.image,
        description: products.description,
        inStock: products.inStock,
        initialStock: products.initialStock,
        categoryName: categories.name,
      })
      .from(products)
      .innerJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.id, Number(params.id)))
    if (!product.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product[0])
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: Record<string, string> }) {
  try {
    const { name, description, image, initialStock, inStock, categoryId } = await req.json();

    if (!name || !description || !image || initialStock === undefined || inStock === undefined) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    await db
      .update(products)
      .set({ name, description, image, initialStock, inStock, categoryId })
      .where(eq(products.id, Number(params.id))) 

    return NextResponse.json({ message: "Product updated successfully" })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: Request, { params }: { params: Record<string, string> }) {
  try {
    await db
      .delete(products)
      .where(eq(products.id, Number(params.id)))

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}
