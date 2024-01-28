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
    <main className="flex flex-col gap-10 max-w-4xl px-12 mx-auto">
      <h3 className="text-3xl font-bold">Products</h3>
      <div className="w-max flex flex-col gap-16">
        <div className="flex gap-4">
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "all" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("all")}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "t-shirts" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("t-shirts")}
          >
            T-Shirts
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "hoodies" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("hoodies")}
          >
            Hoodies
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "bottoms" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("bottoms")}
          >
            Bottoms
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "headwears" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("headwears")}
          >
            Headwears
          </button>
          <button
            className={`px-4 py-2 rounded-md ${
              currentTab === "varsity-jackets" ? "bg-black text-white" : ""
            }`}
            onClick={() => setCurrentTab("varsity-jackets")}
          >
            Varsity Jackets
          </button>
        </div>
        <ProductsView type={currentTab} products={products} />
      </div>
    </main>
  );
}
