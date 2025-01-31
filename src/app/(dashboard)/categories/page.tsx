import { Button } from '@/components/ui/button';
import Link from 'next/link';
import CategoryCard from './_components/CategoryCard';
import { getCategories } from '@/app/lib/db/queries/categories';

export default async function CategoriesPage() {
  const categories = await getCategories();
    console.log(categories)
  return (
    <div className="p-6 w-full h-full">
      <div className="lg:w-[90%] mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link href="/categories/add">
          <Button>Add Category</Button>
        </Link>
      </div>
      <div className="mt-5 grid place-items-center grid-cols-1  lg:grid-cols-2 xl:grid-cols-5 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
