"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { OrderType } from "@/utils/type";
import { StatusDropDown } from "@/components/orders/StatusDropdown";
import Filter from "./Filter";
import Paginate from "./Paginate";

export default function Page() {
  let [isOpen, setIsOpen] = useState(false);
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [offset, setOffset] = useState(0);
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    (async () => {
      const orders = await fetch("/api/getAllOrders");
      const data = await orders.json();
      setOrders(data);
    })();
  }, []);

  const [showPrompt, setShowPrompt] = useState(false);
  const [pickedStatus, setPickedStatus] = useState<any>("");
  const [text, setText] = useState("");
  const [filteredOrders, setFilteredOrders] = useState<OrderType[]>([]);
  const title = "Are you sure";

  useEffect(() => {
    if (showPrompt) {
      // show prompt here
      const result = window.confirm(`${title} ${text}`);
      if (result) {
        // change status here
        const newOrders = orders.map((order) => {
          if (order.orderId === orders[0].orderId) {
            order.deliveryStatus = pickedStatus;
          }
          return order;
        });
        // update orders
        console.log(newOrders);
        alert(`Status changed to ${pickedStatus}`);
        setShowPrompt(false);
      } else {
        // do nothing
        setShowPrompt(false);
      }
    }
  }, [showPrompt]);

  const itemsPerPage = 10;
  const endOffset = offset + itemsPerPage;
  const pageCount = Math.ceil(orders.length / itemsPerPage);
  const currentItems = orders.slice(offset, endOffset);
  const handleNext = (event: { selected: number }) => {
    const selectedPage = event.selected;
    const newOffset = (selectedPage * itemsPerPage) % orders.length;
    setOffset(newOffset);
  };
  const currentItemsLength = currentItems.length;
  useEffect(() => {
    setFilteredOrders(currentItems);
  }, [currentItemsLength]);
  console.log(filteredOrders, "filteredOrders");
  return (
    <main className="flex flex-col gap-10 max-w-4xl mx-auto">
      {/* <h3 className="text-3xl font-bold">Orders</h3> */}
      <div>
        <Filter orders={currentItems} setOrders={setFilteredOrders} />
        <div className="space-y-20">
          {filteredOrders.map((order) => (
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
                    if (product.hasSize) {
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
                            ${product.price}
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
                              onClick={() => setIsOpen(true)}
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
                            ${product.price}
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
                              onClick={() => setIsOpen(true)}
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
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md h-96  transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-hidden overflow-y-auto">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Product Information
                  </Dialog.Title>
                  <div className="mt-2 flex flex-col gap-2">
                    <div className="my-4">
                      <StatusDropDown
                        order={orders[0]}
                        setText={setText}
                        setShowPrompt={setShowPrompt}
                        setPickedStatus={setPickedStatus}
                      />
                    </div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Title:</span>{" "}
                      T-Shirt
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Brand:</span>{" "}
                      Exclusive Dream
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Price:</span>{" "}
                      $1000
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Quantity:</span> 1
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Size:</span> M
                    </p>
                  </div>
                  {/* change staus */}

                  <div className="mt-4 place-self-end flex items-end justify-end h-20">
                    <button
                      type="button"
                      className="h-max inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className="flex justify-between items-center">
        <p>
          Showing {offset + 1} to {endOffset} of {orders.length} Orders
        </p>

        <Paginate pageCount={pageCount} handlePageClick={handleNext} />
      </div>
    </main>
  );
}
