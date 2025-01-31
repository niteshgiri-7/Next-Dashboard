import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { categories } from "@/app/lib/db/schema";
import { db } from "@/app/lib/db";

export async function GET() {
  try {
    const allCategories = await db.select().from(categories);
    return NextResponse.json(allCategories);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, image } = await req.json();
    const category = await db.select().from(categories).where(eq(categories.name,name))
    if(category.length>0) throw new Error("Category already Exists!");
    await db.insert(categories).values({ name, image });
    return NextResponse.json({ message: "Category added" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to add category" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    await db.delete(categories).where(eq(categories.id, id));
    return NextResponse.json({ message: "Category deleted" });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    );
  }
}
