"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { OrderType, ProductCheckoutType } from "@/utils/type";
import { StatusDropDown } from "@/components/orders/StatusDropdown";
import Filter from "./Filter";
import Paginate from "./Paginate";
import Modal from "./Modal";

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
  const [selected, setSelected] = useState<{
    product: ProductCheckoutType;
    orderId: string;
    hasSize: boolean;
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
  });

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

  const sortedOrders = orders.sort((a, b) => b.createdAt - a.createdAt);
  const itemsPerPage = 10;
  const endOffset = offset + itemsPerPage;
  const pageCount = Math.ceil(sortedOrders.length / itemsPerPage);
  const currentItems = sortedOrders.slice(offset, endOffset);
  const handleNext = (event: { selected: number }) => {
    const selectedPage = event.selected;
    const newOffset = (selectedPage * itemsPerPage) % sortedOrders.length;
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
                              onClick={() => {
                                setIsOpen(true),
                                  setSelected({
                                    product: product,
                                    orderId: order.orderId,
                                    hasSize: product.hasSize,
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
                              onClick={() => {
                                setIsOpen(true),
                                  setSelected({
                                    product: product,
                                    orderId: order.orderId,
                                    hasSize: product.hasSize,
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
        orders={orders}
      />
      <div className="flex justify-between items-center">
        <p>
          Showing {offset + 1} to {endOffset} of {orders.length} Orders
        </p>

        <Paginate pageCount={pageCount} handlePageClick={handleNext} />
      </div>
    </main>
  );
}
