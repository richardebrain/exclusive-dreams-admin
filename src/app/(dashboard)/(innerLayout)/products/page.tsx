"use client";
import { useEffect, useState } from "react";
import { ProductsView } from "@/components/products/ProductsView";
import { getAllProducts } from "@/utils/firebase";
import { UploadProductType } from "@/utils/type";

export default function Page() {
  const [products, setProducts] = useState<UploadProductType[]>([]);
  useEffect(() => {
    (async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    })();
  }, []);
  console.log(products, "products");
  const [currentTab, setCurrentTab] = useState("all");

  return (
    <main className="flex flex-col gap-10 max-w-4xl px-4 sm:px-12 mx-auto ">
      <h3 className="text-3xl font-bold">Products</h3>
      <div className=" flex flex-col gap-16">
        <div className="flex gap-4 relative h-12 overflow-x-auto ">
          <div className="flex gap-4 absolute">
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "all" ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentTab("all")}
            >
              All
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "t-shirts" ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentTab("t-shirts")}
            >
              T-Shirts
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "hoodies" ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentTab("hoodies")}
            >
              Hoodies
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "bottoms" ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentTab("bottoms")}
            >
              Bottoms
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "headwears" ? "bg-black text-white" : "bg-gray-100"
              }`}
              onClick={() => setCurrentTab("headwears")}
            >
              Headwears
            </button>
            <button
              className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                currentTab === "varsity-jackets" ? "bg-black text-white" : ""
              }`}
              onClick={() => setCurrentTab("varsity-jackets")}
            >
              Varsity Jackets
            </button>
          </div>
        </div>
        <ProductsView type={currentTab} products={products} />
      </div>
    </main>
  );
}
