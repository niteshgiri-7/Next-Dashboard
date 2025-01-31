import { NextResponse, NextRequest } from "next/server"
import { eq } from "drizzle-orm"
import { categories } from "@/app/lib/db/schema"
import { db } from "@/app/lib/db"

export async function GET(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop()

  try {
    const category = await db
      .select()
      .from(categories)
      .where(eq(categories.id, Number(id)))
    return NextResponse.json(category[0]) 
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to fetch category" },
      { status: 500 }
    )
  }
}

export async function PUT(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop()

  try {
    const { name, image } = await req.json()
    await db
      .update(categories)
      .set({ name, image })
      .where(eq(categories.id, Number(id)))  
    return NextResponse.json({ message: "Category updated" })
  } catch (error) {
    console.log(error)
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.pathname.split("/").pop()

  try {
    await db
      .delete(categories)
      .where(eq(categories.id, Number(id)))  
    return NextResponse.json({ message: "Category deleted successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
