"use client";
import Spinner from "@/components/Spinner";
import { useUserOrder } from "@/hooks/useUserOrder";
import { useUsers } from "@/hooks/useUsers";
import { convertUnix } from "@/utils/unixFormatter";
import Link from "next/link";
import React, { useState } from "react";

const UsersPage = () => {
  const [showOrders, setShowOrders] = useState(false);
  const [bUid, setUid] = useState("");
  const { users, isError, isLoading } = useUsers();
  console.log(users, "users");
  // const fetchUserOrder = (uid: string) => {
  //   if (uid === bUid) {
  //     setShowOrders(!showOrders);
  //   }else{
  //     setShowOrders(true);
  //   }
  // };
  const { orders, isLoading: userLoading } = useUserOrder(bUid);
  console.log(orders, "orders");
  const fetchUserOrder = (uid: string) => {
    setShowOrders((prevShowOrders) => (uid === bUid ? !prevShowOrders : true));
  };

  return (
    <div className="overflow-hidden">
      <main className="flex flex-col gap-10 max-w-4xl px-4 sm:px-12 mx-auto ">
        {isError && <p>Error</p>}
        <div className=" flex flex-col gap-16">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h3 className="text-3xl font-bold">Users</h3>

                <p className="mt-2 text-sm text-gray-700">
                  A list of all the users in your Database.
                </p>
              </div>
            </div>
            <div className="mt-8 flow-root">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th
                          scope="col"
                          className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                        >
                          First Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          Last Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="relative py-3 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">View Orders</span>
                        </th>
                      </tr>
                    </thead>

                    {!isLoading && !users && (
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr className="">
                          <td className="py-4 px-3 col-span-4 mx-auto">
                            No users found
                          </td>
                        </tr>
                      </tbody>
                    )}
                    {isLoading && !users ? (
                      <tbody className="divide-y divide-gray-200 bg-white">
                        <tr>
                          <td colSpan={4} className="">
                            <Spinner className="w-6 h-6  mt-4 mx-auto text-black animate-spin" />
                          </td>
                        </tr>
                      </tbody>
                    ) : (
                      users &&
                      users.map((user) => (
                        <tbody
                          className="divide-y divide-gray-200 bg-white"
                          key={user.uid}
                        >
                          <tr className=" relative">
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                              {user.firstName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 font-medium">
                              {user.lastName}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              {user.email}
                            </td>

                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                              <button
                                type="button"
                                onClick={() => {
                                  fetchUserOrder(user.uid);
                                  setUid(user.uid);
                                }}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                View orders
                                <span className="sr-only">
                                  , {user.firstName}
                                </span>
                              </button>
                            </td>
                          </tr>
                          {showOrders && user.uid === bUid && (
                            <tr className="">
                              <td className="col-span-4 row-span-4" colSpan={4}>
                                <table className="w-full border  divide-y divide-gray-300 border-collapse">
                                  <thead className="">
                                    <tr>
                                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Order ID
                                      </th>
                                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Payment Status
                                      </th>
                                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Delivery Status
                                      </th>
                                      <th className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500">
                                        Order Date
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {showOrders &&
                                      user.uid === bUid &&
                                      userLoading && (
                                        <tr>
                                          <td colSpan={4} className="">
                                            <Spinner className="w-6 h-6  mt-4 mx-auto text-black animate-spin" />
                                          </td>
                                        </tr>
                                      )}
                                    {showOrders &&
                                      user.uid === bUid &&
                                      !userLoading &&
                                      !orders?.length && (
                                        <tr className="">
                                          <td
                                            className="col-span-4 row-span-4"
                                            colSpan={4}
                                          >
                                            <p className="py-4 px-3 text-sm font-medium text-gray-900 text-center">
                                              No Orders found
                                            </p>
                                          </td>
                                        </tr>
                                      )}
                                    {showOrders &&
                                      user.uid === bUid &&
                                      orders &&
                                      orders.map((order) => (
                                        <tr
                                          key={order.orderId}
                                          className=" odd:bg-gray-100"
                                        >
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium border ">
                                            <Link
                                              href={`/orders?orderId=${order.orderId}`}
                                              className="text-blue-600 underline"
                                            >
                                              {order.orderId}
                                            </Link>
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium border ">
                                            {order.status}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium border ">
                                            {order.deliveryStatus}
                                          </td>
                                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-medium border ">
                                            {
                                              convertUnix(order.createdAt)
                                                .dateOnly
                                            }
                                          </td>
                                        </tr>
                                      ))}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      ))
                    )}
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UsersPage;
