import { UploadProductType } from "@/utils/type";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

type ProductsViewProps = {
  type: string;
  products: UploadProductType[];
};
export const ProductsView = ({ type, products }: ProductsViewProps) => {
  const handleDelete = async (productId: string) => {
    const response = confirm("Are you sure you want to delete this item?");
    if (!response) {
      return;
    }
    try {
      const fetchRes = await fetch("/api/getAllProducts/deleteProduct", {
        method: "Post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const res = await fetchRes.json();
      toast.success("Deleted Successfully");
    } catch (error) {
      console.log(error);
      return;
    }
  };
  console.log(products, "products");
  return (
    <div className="grid sm:grid-cols-2  md:grid-cols-3 gap-4 overflow-hidden relative">
      {type === "all" &&
        products.map((product) => (
          <div
            className="flex flex-col gap-4 relative group px-2 py-1 rounded-sm"
            key={product.productId}
          >
            <div className="absolute top-4 right-2 invisible group-hover:visible z-40">
              <Link
                href={`/products/${product.productId}`}
                className="bg-white px-3 py-2.5 shadow-md text-blue-600 "
              >
                Edit
              </Link>
            </div>
            <div className="absolute top-2 left-2 invisible group-hover:visible z-40">
              <button
                className="bg-red-500 px-3 py-1.5 text-white rounded-sm"
                onClick={() => handleDelete(product.productId)}
              >
                Delete
              </button>
            </div>
            <div className="absolute inset-0 w-full bg-gray-400 opacity-0 group-hover:opacity-5"></div>
            <Image
              src={product.imageUrl[0]}
              alt=""
              className="w-auto h-80 object-cover"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {product.productTitle}
              </h3>
              <span className="text-sm font-semibold text-gray-700">
                $
                {parseFloat(product.price).toLocaleString("en-US", {
                  currency: "usd",
                })}
              </span>
            </div>
          </div>
        ))}
      {products
        .filter((product) => product.category === type)
        .map((product) => (
          <div
            className="flex flex-col gap-4 relative group px-2 py-1 rounded-sm"
            key={product.productId}
          >
            <div className="absolute top-4 right-2 invisible group-hover:visible z-40">
              <Link
                href={`/products/${product.productId}`}
                className="bg-white px-3 py-1.5 text-blue-600 shadow-md "
              >
                Edit
              </Link>
            </div>
            <div className="absolute top-2 left-2 invisible group-hover:visible z-40">
              <button
                className="bg-red-500 px-3 py-1.5 text-white rounded-sm"
                onClick={() => handleDelete(product.productId)}
              >
                Delete
              </button>
            </div>
            <div className="absolute inset-0 w-full  bg-gray-400 opacity-0 group-hover:opacity-5"></div>
            <Image
              src={product.imageUrl[0]}
              alt=""
              className="w-auto h-80 object-cover"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{product.productTitle}</h3>
              <span className="text-sm font-semibold">
                $
                {parseFloat(product.price).toLocaleString("en-US", {
                  currency: "usd",
                })}
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
