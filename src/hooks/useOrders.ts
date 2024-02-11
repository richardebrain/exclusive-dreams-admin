import useSWR from "swr";
import { fetcher } from "./fetcher";
import { OrderType } from "@/utils/type";

export const useOrders = () => {
  const { data, error, isLoading } = useSWR<OrderType[]>("/api/getAllOrders", fetcher);
  return {
    orders: data,
    isLoading: isLoading,
    isError: error,
  };
};
