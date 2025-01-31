import { db } from "@/app/lib/db";
import { categories, products } from "@/app/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";



export async function POST(req: Request) {
  try {
    const { name, description, inStock, image, categoryName, initialStock } = await req.json();

      const category = await db
         .select()
         .from(categories)
         .where(eq(categories.name,categoryName));
       

    if (!category) {
      return NextResponse.json({ error: "Category not found" }, { status: 400 });
    }

    await db.insert(products).values({
      name,
      image,
      description,
      inStock,
      initialStock,
      categoryId: category[0].id,
    });

    return NextResponse.json({ message: "Product added successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 });
  }
}


export async function GET() {
  try {
    const allCategories = await db.select().from(products);
    return NextResponse.json(allCategories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
