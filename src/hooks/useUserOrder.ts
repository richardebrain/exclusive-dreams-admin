import useSWR from "swr";
import { fetcher } from "./fetcher";
import { OrderType } from "@/utils/type";

export const useUserOrder = (uid: string) => {
  const { data, error, isLoading } = useSWR<OrderType[]>(
    `/api/getAllOrders/${uid}`,
    fetcher
  );
  return {
    orders: data,
    isLoading: isLoading,
    isError: error,
  };
};
