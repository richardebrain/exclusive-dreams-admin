"use client";
import { useEffect, useState } from "react";
import { ProductsView } from "@/components/products/ProductsView";
import { getAllProducts } from "@/utils/firebase";
import { UploadProductType } from "@/utils/type";
import { useProducts } from "@/hooks/useProducts";

const tabs = [
  {
    name: "all",
    label: "All",
  },
  {
    name: "shirts",
    label: "Shirts",
  },
  {
    name: "t-shirts",
    label: "T-Shirts",
  },
  {
    name: "hoodies",
    label: "Hoodies",
  },
  {
    name: "bottoms",
    label: "Bottoms",
  },
  {
    name: "headwears",
    label: "Headwears",
  },
  {
    name: "varsity-jackets",
    label: "Varsity Jackets",
  },
];
export default function Page() {
  // const [products, setProducts] = useState<UploadProductType[]>([]);
  const { products, isLoading, isError } = useProducts();
  const [currentTab, setCurrentTab] = useState("all");

  return (
    <main className="flex flex-col gap-10 max-w-4xl mx-auto ">
      <h3 className="text-3xl font-bold">Products</h3>
      <div className=" flex flex-col gap-16">
        <div className="flex gap-4 relative h-12 overflow-x-auto overflow-y-hidden">
          <div className="flex gap-4 absolute">
            {tabs.map((tab) => (
              <button key={tab.name}
                className={`px-4 py-2 rounded-md whitespace-nowrap  ${
                  currentTab === tab.name
                    ? "bg-black text-white"
                    : "bg-gray-100"
                }`}
                onClick={() => setCurrentTab(tab.name)}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {!products && isLoading && <p>Loading...</p>}
       
        {products && products.length > 0 && (
          <ProductsView type={currentTab} products={products} />
        )}
      </div>
    </main>
  );
}
