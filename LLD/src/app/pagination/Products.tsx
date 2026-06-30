import { IProduct } from "./page";

export interface IProductProps {
  product: IProduct;
}

function Products({ product }: Readonly<IProductProps>) {
  return (
    <div className="mb-8 w-full px-4 md:w-1/2 lg:w-1/4">
      <div className="h-full shadow">
        <div className="h-75">
          <img src={product.thumbnail} className="mx-auto" />
        </div>
        <div className="p-4">
          <div className="mb-2 text-[1rem]">{product.title}</div>
          <div className="text-sm">{product.description}</div>
          <div className="text-right">${product.price}</div>
        </div>
      </div>
    </div>
  );
}

export default Products;
