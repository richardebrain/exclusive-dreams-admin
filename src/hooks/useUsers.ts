'use client'
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { User } from "@/utils/type";

export const useUsers = () => {
  const { data, error, isLoading } = useSWR<User[]>("/api/getAllUsers", fetcher);
  return {
    users: data,
    isLoading: isLoading,
    isError: error,
  };
};
