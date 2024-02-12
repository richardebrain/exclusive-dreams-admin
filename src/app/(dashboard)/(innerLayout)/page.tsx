"use client";
import { useOrders } from "@/hooks/useOrders";
import { useUsers } from "@/hooks/useUsers";
import { OrderType } from "@/utils/type";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const { users, isLoading, isError } = useUsers();
  const { orders, isLoading: orderLoading, isError: orderError } = useOrders();
  const returnStatus = () => {
    const status = ["succeeded", "refunded"];
    // group by status
    const orderstatus = orders?.reduce((acc, order) => {
      if (acc[order.status]) {
        acc[order.status].push(order);
      } else {
        acc[order.status] = [order];
      }
      return acc;
    }, {} as Record<string, OrderType[]>);
    return orderstatus;
  };
  const uniqueUsers = new Set(orders?.map((order) => order.userId));
  console.log(uniqueUsers, "unique");
  console.log(returnStatus(), "status");
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="w-full">
        <h1 className="text-4xl mdd:text-5xl text-center font-bold">Welcome Back</h1>
        <div className="grid md:grid-cols-2 mt-20 gap-10">
          {/* cards */}
          <div className="w-full flex flex-col justify-between shadow-md h-60 px-10 py-6 bg-green-300">
            <div>
              <div className="flex gap-4">
                <UserCircleIcon className="w-7  h-7 self-center text-white stroke-2" />
                <p className="text-2xl font-bold">
                  Total Users:{" "}
                  <span className="font-normal text-gray-600">
                    {users?.length}
                  </span>
                </p>
              </div>
              <div className="mt-3">
                <p className="text-gray-800 font-medium">Users With Transactions : {uniqueUsers.size}</p>
              </div>
            </div>
            <Link
              href={"/users"}
              className=" gap-1 text-blue-600 items-center  block underline group hover:text-blue-700"
            >
              click to see all Users
              <ArrowRightIcon className="w-5 h-5 stroke-2 inline ml-1 group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
          <div className="w-full shadow-md  h-60 px-10 py-6 flex flex-col justify-between bg-orange-200">
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <ShoppingCartIcon className="w-7 h-7 text-white self-center stroke-2" />
                <p className="text-2xl font-bold">
                  Total Orders:{" "}
                  <span className="font-normal text-gray-600">
                    {orders?.length}
                  </span>
                </p>
              </div>
              <div>
                {returnStatus() &&
                  Object.keys(returnStatus()!).map((status) => {
                    return (
                      <div
                        key={status}
                        className="flex gap-1 ml-12 items-center"
                      >
                        <p className="text-black font-semibold capitalize">
                          {status}:{" "}
                        </p>
                        <p className="text-black  font-medium">
                          {returnStatus()![status].length}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
            <Link
              href={"/orders"}
              className=" gap-1 text-blue-600 items-center  block underline group hover:text-blue-700"
            >
              click to see all Orders
              <ArrowRightIcon className="w-5 h-5 stroke-2 inline ml-1 group-hover:translate-x-1 duration-300" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
