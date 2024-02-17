"use client";
import { OrderType } from "@/utils/type";
import React, { useState } from "react";
const categories = [
  { value: "t-shirts", label: "T-shirts" },
  { value: "headwears", label: "Head Wears" },
  { value: "varsity-jackets", label: "Varsity Jackets" },
  { value: "hoodies", label: "Hoodies" },
];
const sortOptions = [
  { value: "Ascending", label: "Ascending" },
  { value: "Descending", label: "Descending" },
];
const paymentOptions = [
  { value: "succeeded", label: "Succeeded" },
  { value: "refunded", label: "Refunded" },
];

const deliveryOptions = [
  { value: "processing", label: "Processing" },
  { value: "shipped", label: "Shipped" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
  { value: "order placed", label: "Order placed" },
];

interface FilterProps {
  orders: OrderType[];
  setOrders: React.Dispatch<React.SetStateAction<OrderType[]>>;
}
const Filter = ({ orders, setOrders }: FilterProps) => {
  const [state, setState] = useState({
    category: "",
    paymentStatus: "",
    deliveryStatus: "",
    sort: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    if (value === "") return setOrders(orders);
    if (name === "category") {
      filterByCategory(value);
    }
    if (name === "paymentStatus") {
      filterByPaymentStatus(value);
    }
    if (name === "deliveryStatus") {
      filterByDeliveryStatus(value);
    }
    if (name === "sort") {
      if (value === "Ascending") {
        const newOrders = orders.sort((a, b) => a.createdAt - b.createdAt);
        setOrders(newOrders);
      }
      if (value === "Descending") {
        const newOrders = orders.sort((a, b) => b.createdAt - a.createdAt);
        setOrders(newOrders);
      }
    }
  };

  const handleReset = () => {
    setState({
      category: "",
      paymentStatus: "",
      deliveryStatus: "",
      sort: "",
    });
    setOrders(orders);
  };
  const filterByDeliveryStatus = (status: string) => {
    const newOrders = orders.filter((order) => order.deliveryStatus === status);
    setOrders(newOrders);
  };
  const filterByDate = (date: number) => {
    const newOrders = orders.filter((order) => order.createdAt === date);
    setOrders(newOrders);
  };
  const filterByCustomer = (userId: string) => {
    const newOrders = orders.filter((order) => order.userId === userId);
    setOrders(newOrders);
  };

  const filterByPaymentStatus = (status: string) => {
    const newOrders = orders.filter((order) => order.status === status);
    setOrders(newOrders);
  };
  const filterByCategory = (category: string) => {
    const newOrders = orders.filter((order) =>
      order.cart.some((product) => product.category === category)
    );
    setOrders(newOrders);
  };

  return (
    <section className="">
      <div className="pt-10 md:pt-20 pb-10 bg-white ">
        <div className=" mx-auto max-w-4xl ">
          <div className="lg:flex lg:items-center lg:justify-between relative overflow-x-scroll md:overflow-hidden w-full">
            <p className="text-2xl font-bold text-center text-gray-900 lg:text-left">
              Orders
            </p>
            <div className="">
              <div className="flex items-center justify-center mt-6 space-x-5 sm:mt-8 lg:justify-end lg:mt-0 py-3 md:py-0 ">
                <div>
                  <label htmlFor="category">
                    <span className="sr-only">Category</span>
                    <select
                      id="category"
                      name="category"
                      onChange={handleChange}
                      value={state.category}
                      className="block w-fit py-2 px-2 text-base text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="">Category</option>
                      {categories.map((category) => (
                        <option
                          key={category.value}
                          value={category.value}
                          className="capitalize"
                        >
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <label htmlFor="paymentStatus">
                    <span className="sr-only">Payment Status</span>
                    <select
                      id="paymentStatus"
                      name="paymentStatus"
                      onChange={handleChange}
                      value={state.paymentStatus}
                      className="block w-fit py-2 px-2 text-base text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="">Payment Status</option>
                      {paymentOptions.map((payment) => (
                        <option
                          key={payment.value}
                          value={payment.value}
                          className="capitalize"
                        >
                          {payment.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                <div>
                  <label htmlFor="deliveryStatus">
                    <span className="sr-only">Delivery Status</span>
                    <select
                      id="deliveryStatus"
                      name="deliveryStatus"
                      onChange={handleChange}
                      value={state.deliveryStatus}
                      className="block w-fit py-2 px-2 text-base text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="">Delivery Status</option>
                      {deliveryOptions.map((delivery) => (
                        <option
                          key={delivery.value}
                          value={delivery.value}
                          className="capitalize"
                        >
                          {delivery.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>
                {/* <div>
                  <label htmlFor="sort">
                    <span className="sr-only">Sort</span>
                    <select
                      id="sort"
                      name="sort"
                      onChange={handleChange}
                      value={state.sort}
                      className="block w-fit py-2 px-2 text-base text-gray-900 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black focus:border-black sm:text-sm"
                    >
                      <option value="">Sort</option>
                      {sortOptions.map((sort) => (
                        <option
                          key={sort.value}
                          value={sort.value}
                          className="capitalize"
                        >
                          {sort.label}
                        </option>
                      ))}
                    </select>
                  </label>
                </div> */}
                <button
                  className="bg-blue-500 text-white px-3 rounded-md py-1.5"
                  onClick={handleReset}
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="py-6 bg-gray-100">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:items-center">
                <div className="flex items-center">
                  <p className="text-sm font-normal text-gray-700">Filters:</p>

                  <div className="ml-3 flex flex-wrap gap-2.5">
                    <div className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-700 transition-all duration-200 bg-white rounded-md group">
                      Clothings
                      <button
                        type="button"
                        className="p-1 -m-1 group-hover:text-gray-900"
                      >
                        <svg
                          className="h-4 w-4 ml-2 -mr-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="inline-flex items-center justify-center px-3 py-2 text-sm font-bold text-gray-700 transition-all duration-200 bg-white rounded-md group">
                      $50-$100
                      <button
                        type="button"
                        className="p-1 -m-1 group-hover:text-gray-900"
                      >
                        <svg
                          className="h-4 w-4 ml-2 -mr-0.5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="inline-flex mt-4 text-xs font-medium tracking-widest text-gray-500 uppercase transition-all duration-200 sm:mt-0 sm:ml-4 hover:text-gray-900"
                >
                  Clear all
                </button>
              </div>

              <div className="hidden sm:block">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2 text-sm font-bold text-gray-700 transition-all duration-200 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 focus:outline-none"
                >
                  Sort
                  <svg
                    className="w-4 h-4 ml-2 -mr-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div> */}
    </section>
  );
};

export default Filter;
