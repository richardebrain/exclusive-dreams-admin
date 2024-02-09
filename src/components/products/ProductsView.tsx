import { UploadProductType } from "@/utils/type";
import Image from "next/image";

type ProductsViewProps = {
  type: string;
  products: UploadProductType[];
};
export const ProductsView = ({ type, products }: ProductsViewProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 overflow-hidden">
      {type === "all" &&
        products.map((product) => (
          <div className="flex flex-col gap-4" key={product.productId}>
            <Image
              src={product.imageUrl[0]}
              alt=""
              className="w-auto h-80 object-cover"
              width={200}
              height={200}
            />
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-bold">{product.productTitle}</h3>
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
                className="w-auto h-80 object-cover"
                width={200}
                height={200}
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{product.productTitle}</h3>
                <span className="text-sm font-semibold">${product.price}</span>
              </div>
            </div>
          ))}
  
    </div>
  );
};
