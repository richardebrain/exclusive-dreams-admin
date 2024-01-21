"use client";
import { useState } from "react";
import { ProductsView } from "@/components/products/ProductsView";



export default function Page() {
    const [currentTab, setCurrentTab] = useState("all");

    return (
        <main className="flex flex-col gap-10">
            <h3 className="text-3xl font-bold">Products</h3>
            <div className="flex flex-col gap-16">
                <div className="flex gap-4">
                    <button
                        className={`px-4 py-2 rounded-md ${currentTab === "all" ? "bg-purple-500 text-white" : ""
                            }`}
                        onClick={() => setCurrentTab("all")}
                    >
                        All
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${currentTab === "t-shirts" ? "bg-purple-500 text-white" : ""
                            }`}
                        onClick={() => setCurrentTab("t-shirts")}
                    >
                        T-Shirts
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${currentTab === "hoodies" ? "bg-purple-500 text-white" : ""
                            }`}
                        onClick={() => setCurrentTab("hoodies")}
                    >
                        Hoodies
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${currentTab === "bottoms" ? "bg-purple-500 text-white" : ""
                            }`}
                        onClick={() => setCurrentTab("bottoms")}
                    >
                        Bottoms
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md ${currentTab === "headwears" ? "bg-purple-500 text-white" : ""
                            }`}
                        onClick={() => setCurrentTab("headwears")}
                    >
                        Headwears
                    </button>
                </div>
                <ProductsView type={currentTab} />
            </div>


        </main>
    )
}
