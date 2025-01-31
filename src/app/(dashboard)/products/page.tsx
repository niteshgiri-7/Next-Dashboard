import { Button } from '@/components/ui/button';
import Link from 'next/link';
import ProductTable from './_components/ProductTable';
import { getProducts } from '@/app/lib/db/queries/products';

export default async function ProductsPage() {
  const products = await getProducts();
  console.log(products);
  
  return (
    <div className="p-6 w-full ">
      <div className="lg:w-[90%] mx-auto flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/products/add">
          <Button>Add Product</Button>
        </Link>
      </div>
    {products.length>0 ? <ProductTable products={products} /> :<div className='font-bold w-full h-3/4 text-xl flex justify-center items-center '><h2>
      
      No Products yet,Add Some</h2>
      </div>
      }
    </div>
  );
}