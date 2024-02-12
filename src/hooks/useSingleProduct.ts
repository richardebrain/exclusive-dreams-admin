import { fetcher } from "@/hooks/fetcher";
import useSWR from "swr";

export function useSingleProduct(id: string) {
  const { data, error } = useSWR(`/api/getAllProducts/${id}`, fetcher);
  return {
    product: data,
    isLoading: !error && !data,
    isError: error,
  };
}
