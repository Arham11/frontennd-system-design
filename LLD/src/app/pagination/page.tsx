"use client";

import { useEffect, useRef, useState } from "react";
import Products from "./Products";

const LIMIT = 12;

export interface IProduct {
  id: number;
  title: string;
  thumbnail: string;
  description: string;
  price: number;
  discountPercentage: number;
}

function Page() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [productsData, setProductsData] = useState<IProduct[]>([]);
  const [totalProduct, setTotalProduct] = useState<number>(0);

  const totalPageButton = Math.ceil(totalProduct / LIMIT);

  useEffect(
    function () {
      const fetchProducts = async function () {
        const data = await fetch(
          `https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * currentPage}&select=title,description,price,discountPercentage,thumbnail`,
        );
        const json = await data.json();
        setProductsData(json.products);
        setTotalProduct(json.total);
      };

      fetchProducts();
    },
    [currentPage],
  );

  return (
    <>
      <div className="flex flex-wrap">
        {productsData?.map((item) => (
          <Products key={item.id} product={item} />
        ))}
      </div>
      <div className="flex justify-center gap-3">
        {new Array(totalPageButton).fill(null).map((_, index) => {
          return (
            <button
              className="h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-gray-900 text-sm text-white"
              key={index}
              onClick={() => setCurrentPage(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default Page;
