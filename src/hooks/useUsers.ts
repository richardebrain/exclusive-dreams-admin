"use client";
import useSWR from "swr";
import { fetcher } from "./fetcher";
import { GuestType, User } from "@/utils/type";

export const useUsers = () => {
  const { data, error, isLoading } = useSWR<GuestType[]>(
    "/api/getAllUsers",
    fetcher
  );
  const uniqueUsers = data?.reduce((acc: GuestType[], curr) => {
    if (!acc.find((user) => user.guestId === curr.guestId)) {
      acc.push(curr);
    }
    return acc;
  }, []);

  return {
    guest: uniqueUsers,
    isLoading: isLoading,
    isError: error,
  };
};
