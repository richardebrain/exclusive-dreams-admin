import { UploadProductType } from "@/utils/type";
import Image from "next/image";

type ProductsViewProps = {
  type: string;
  products: UploadProductType[];
};
export const ProductsView = ({ type, products }: ProductsViewProps) => {
  return (
    <div className="grid grid-cols-4 gap-8 w-max">
      {type === "all" &&
        products.map((product) => (
          <div className="flex flex-col gap-4" key={product.productTitle}>
            <Image
              src={product.imageUrl[0]}
              alt=""
              className="w-48 h-48 object-cover"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{product.productTitle}</h3>
              <span className="text-sm font-semibold">{product.category}</span>
              <span className="text-sm font-semibold">{product.price}</span>
            </div>
          </div>
        ))}
      {
        products
          .filter((product) => product.category === type)
          .map((product) => (
            <div className="flex flex-col gap-4" key={product.productId}>
              <Image
                src={product.imageUrl[0]}
                alt=""
                className="w-48 h-48 object-cover"
                width={200}
                height={200}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{product.productTitle}</h3>
                <span className="text-sm font-semibold">
                  {product.category}
                </span>
                <span className="text-sm font-semibold">${product.price}</span>
              </div>
            </div>
          ))}
  
    </div>
  );
};
