import useSWR from "swr";
import { fetcher } from "./fetcher";
import { ProductCheckoutType, User } from "@/utils/type";

export const useProducts = () => {
  const { data, error, isLoading } = useSWR<ProductCheckoutType[]>("/api/getAllProducts", fetcher);
  return {
    products: data,
    isLoading: isLoading,
    isError: error,
  };
};
