export type CategoryType = {
    id:number;
    name:string;
    description:string;
    image:string;
}

export type ProductType = {
    id:number;
    name:string;
    description:string;
    initialStock:number;
    inStock:number;
    image:string;
    categoryId:number|null;
    categoryName:string|null;
}