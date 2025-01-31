import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories",{
    id: serial("id").primaryKey(),
    name:varchar("name",{length:50}).notNull(),
    image:varchar("image",{length:100}).notNull()
});

export const products = pgTable("products",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:50}).notNull(),
    description:text("description").notNull(),
    image:varchar("image",{length:100}).notNull(),
    initialStock:integer("initialStock").notNull(),
    inStock:integer("inStock").notNull(),
    categoryId:integer("categoryId").references(()=>categories.id)
});