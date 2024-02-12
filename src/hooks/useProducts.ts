import useSWR from "swr";
import { fetcher } from "./fetcher";
import { ProductCheckoutType, UploadProductType, User } from "@/utils/type";

export const useProducts = () => {
  const { data, error, isLoading } = useSWR<UploadProductType[]>(
    "/api/getAllProducts",
    fetcher
  );
  return {
    products: data,
    isLoading: isLoading,
    isError: error,
  };
};
