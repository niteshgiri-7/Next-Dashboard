ALTER TABLE "products" RENAME COLUMN "initial_stock" TO "initialStock";--> statement-breakpoint
ALTER TABLE "products" RENAME COLUMN "category_id" TO "categoryId";--> statement-breakpoint
ALTER TABLE "products" DROP CONSTRAINT "products_category_id_categories_id_fk";
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;