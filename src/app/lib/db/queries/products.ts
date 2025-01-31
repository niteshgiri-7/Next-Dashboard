

import { db } from "@/app/lib/db"; 
import { products, categories } from "@/app/lib/db/schema"; 
import { eq } from "drizzle-orm";

export async function getProducts() {
  const result = await db
    .select({
      id: products.id,
      name: products.name,
      description: products.description,
      image: products.image,
      initialStock: products.initialStock,
      inStock: products.inStock,
      categoryId: products.categoryId,
      categoryName: categories.name, 
    })
    .from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id)); 
  return result;
}
