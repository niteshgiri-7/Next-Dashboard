import { NextResponse } from "next/server"
import { eq } from "drizzle-orm"
import { categories } from "@/app/lib/db/schema"
import { db } from "@/app/lib/db"

export async function GET(req: Request, { params }: { params: { id: number } }) {
  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, params.id))
    return NextResponse.json(category[0]) 
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    )
  }
}

export async function PUT(req: Request, { params }: { params: { id: number } }) {
  try {
    const { name, image } = await req.json()
    await db
      .update(categories)
      .set({ name, image })
      .where(eq(categories.id, params.id))
    return NextResponse.json({ message: "Category updated" })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    )
  }
}



export async function DELETE(req: Request, { params }: { params: { id: number } }) {
  try {
    
    await db
      .delete(categories)
      .where(eq(categories.id, params.id));

    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
