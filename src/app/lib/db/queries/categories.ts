import { db } from "..";
import { categories } from "../schema";


export async function getCategories() {
  return await db.select().from(categories);
}