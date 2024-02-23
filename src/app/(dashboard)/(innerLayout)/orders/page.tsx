"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { OrderType, ProductCheckoutType } from "@/utils/type";
import { StatusDropDown } from "@/components/orders/StatusDropdown";
import Filter from "./Filter";
import Paginate from "./Paginate";
import Modal from "./Modal";
import useSwr from "swr";
import { updateOrderStatus } from "@/utils/firebase";
import { fetcher } from "@/hooks/fetcher";
import { useParams, useSearchParams } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { stat } from "fs";

export default function Page() {
  let [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [offset, setOffset] = useState(0);
  const [search, setSearch] = useState("");
  const params = useSearchParams();
  const isOrderId = params.has("orderId");

  function closeModal() {
    setIsOpen(false);
  }
  const { data, error, isLoading, mutate } = useSwr<OrderType[]>(
    "/api/getAllOrders",
    fetcher,
    { revalidateOnMount: true }
  );
  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);
  const [showPrompt, setShowPrompt] = useState(false);
  const [pickedStatus, setPickedStatus] = useState<
    "processing" | "shipped" | "delivered" | "cancelled" | "order placed"
  >("order placed");
  const [text, setText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const [selected, setSelected] = useState<{
    product: ProductCheckoutType;
    orderId: string;
    hasSize: boolean;
    userId: string;
  }>({
    orderId: "",
    product: {
      category: "",
      color: "",
      hasSize: false,
      imageUrl: "",
      price: "",
      productTitle: "",
      productId: "",
      size: "",
      quantity: 0,
    },
    hasSize: false,
    userId: "",
  });

  const title = "Are you sure";
  const updateDb = async (
    userId: string,
    orderId: string,
    deliveryStatus: string,
    status?: string
  ) => {
    const result = await updateOrderStatus(
      userId,
      orderId,
      deliveryStatus,
      status
    );
    return result;
  };
  const sendMail = async (statusType: string, order: OrderType) => {
    const dataToSend = {
      statusType: statusType,
      orderDetails: order,
    };
    const res = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    });
    const data = await res.json();
    return data;
  };
  useEffect(() => {
    if (showPrompt) {
      // show prompt here
      const result = window.confirm(`${title} ${text}`);
      if (result) {
        // change status here
        const newOrders = filtered.map((order) => {
          console.log(selected.orderId, order.orderId);
          if (order.orderId === selected.orderId) {
            try {
              (async () => {
                const update = await updateDb(
                  selected.userId,
                  selected.orderId,
                  pickedStatus
                );
                console.log(update, "update");
                if (update.success) {
                  order.deliveryStatus = pickedStatus;
                  const res = await sendMail(pickedStatus, order);
                  console.log(res, "mail sent");
                  mutate();
                }
              })();
            } catch (error) {
              console.log(error, "error updating order status");
            }
          }
          return order;
        });
        // update orders
        setFilteredOrders(newOrders);
        alert(`Status changed to ${pickedStatus}`);
        setShowPrompt(false);
      } else {
        // do nothing
        setShowPrompt(false);
      }
    }
  }, [showPrompt]);

  const sortedOrders = orders.sort((a, b) => b.createdAt - a.createdAt);
  const itemsPerPage = 10;
  const endOffset = offset + itemsPerPage;
  const pageCount = Math.ceil(sortedOrders.length / itemsPerPage);
  const currentItems = sortedOrders.slice(offset, endOffset);
  const handleNext = (event: { selected: number }) => {
    const selectedPage = event.selected;
    // setSearch("");
    const newOffset = (selectedPage * itemsPerPage) % sortedOrders.length;
    setOffset(newOffset);
  };

  const searchId = params.get("orderId") || "";
  useEffect(() => {
    setSearch(searchId);
  }, [isOrderId]);
  const filtered =
    search && search !== ""
      ? sortedOrders.filter((order) => {
          return (
            order.orderId.toLowerCase().includes(search.toLowerCase()) ||
            (order.email &&
              order.email.toLowerCase().includes(search.toLowerCase()))
          );
        })
      : currentItems;
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <main className="">
      {/* <h3 className="text-3xl font-bold">Orders</h3> */}
      <div>
        <Filter orders={currentItems} setOrders={setFilteredOrders} />
        <div className="relative max-w-4xl mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by Order No or email"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <button
            className={`${
              search === "" ? "hidden" : "block"
            } absolute top-2.5 right-2 text-gray-500 cursor-pointer`}
            onClick={() => setSearch("")}
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-20 flex flex-col max-w-4xl mx-auto">
          {filtered.map((order) => (
            <div key={order.orderId}>
              <h3 className="sr-only">
                Order placed on{" "}
                {/* <time dateTime={order.createdAt}>{order.createdAt}</time> */}
              </h3>

              <table className="mt-4 w-full text-gray-500 sm:mt-6 w-4/">
                <caption className="sr-only">Products</caption>
                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Price $
                    </th>
                    <th
                      scope="col"
                      className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pr-3 font-normal sm:table-cell"
                    >
                      Payment Status
                    </th>
                    <th scope="col" className="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                  {order.cart.map((product) => {
                    if (product.hasSize || product.size !== "") {
                      return (
                        <tr key={product.productId + product.size}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.imageUrl}
                                alt={product.productTitle}
                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.productTitle}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {product.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            $
                            {parseFloat(product.price).toLocaleString("en-us", {
                              currency: "usd",
                            })}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            <div className="flex flex-col gap-1">
                              <p>{order.shipping.name}</p>
                              {/* <p>{order.shipping.email}</p> */}
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {order.status}
                          </td>
                          <td className="whitespace-nowrap py-6 text-right font-medium">
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(true),
                                  setSelected({
                                    product: product,
                                    orderId: order.orderId,
                                    hasSize: product.hasSize,
                                    userId: order.userId,
                                  });
                              }}
                              className="text-indigo-600"
                            >
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">
                                {product.productTitle}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr key={product.productId}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.imageUrl}
                                alt={product.productTitle}
                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                              />
                              <div>
                                <div className="font-medium text-gray-900">
                                  {product.productTitle}
                                </div>
                                <div className="mt-1 sm:hidden">
                                  {product.category}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            $
                            {parseFloat(product.price).toLocaleString("en-us", {
                              currency: "usd",
                            })}
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            <div className="flex flex-col gap-1">
                              <p>{order.shipping.name}</p>
                              {/* <p>{order.shipping.email}</p> */}
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">
                            {order.status}
                          </td>
                          <td className="whitespace-nowrap py-6 text-right font-medium">
                            <button
                              type="button"
                              onClick={() => {
                                setIsOpen(true),
                                  setSelected({
                                    product: product,
                                    orderId: order.orderId,
                                    hasSize: product.hasSize,
                                    userId: order.userId,
                                  });
                              }}
                              className="text-indigo-600"
                            >
                              View
                              <span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">
                                {product.productTitle}
                              </span>
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                  <tr className="py-4 h-10 ">
                    <td colSpan={3}>Order Status:</td>

                    <td colSpan={2} className="text-right">
                      <span
                        className={`"font-bold capitalize text-white px-2 shadow-md py-1.5 rounded-sm w-full inline-block ${
                          order.deliveryStatus === "shipped"
                            ? " bg-green-400"
                            : order.deliveryStatus === "order placed"
                            ? "bg-blue-500"
                            : order.deliveryStatus === "processing"
                            ? "bg-yellow-500"
                            : order.deliveryStatus === "cancelled"
                            ? "bg-red-500"
                            : order.deliveryStatus === "delivered" &&
                              "bg-green-800"
                        } `}
                      >
                        {order.deliveryStatus}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        selected={selected}
        setShowPrompt={setShowPrompt}
        setText={setText}
        setPickedStatus={setPickedStatus}
        orders={filtered}
      />
      <div className="flex flex-col md:flex-row md:justify-between items-center max-w-4xl mx-auto">
        <p>
          Showing {offset + 1} to {endOffset} of {sortedOrders.length} Orders
        </p>

        <Paginate pageCount={pageCount} handlePageClick={handleNext} />
      </div>
    </main>
  );
}
