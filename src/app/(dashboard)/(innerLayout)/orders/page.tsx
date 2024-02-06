"use client";
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from '@headlessui/react'
import { OrderType } from "@/utils/type"
import { StatusDropDown } from "@/components/orders/StatusDropdown"


export default function Page() {
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const orders = [
        {
            orderId: "1",
            customerName: "John Doe",
            customerEmail: "john@gmail.com",
            customerAddress: "123, Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, quos.",
            customerPhone: "1234567890",
            orderDate: "2021-08-01",
            orderStatus: "pending",
            orderTotal: "1000",
            orderItems: [
                {
                    productId: "1",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                },
                {
                    productId: "2",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                },
                {
                    productId: "3",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                }
            ],
        },
        {
            orderId: "2",
            customerName: "Mary Jones",
            customerEmail: "maryjones@gmail.com",
            customerAddress: "123, Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, quos.",
            customerPhone: "1234567890",
            orderDate: "2021-08-01",
            orderStatus: "pending",
            orderTotal: "1000",
            orderItems: [
                {
                    productId: "1",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                },
                {
                    productId: "2",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                },
                {
                    productId: "3",
                    productTitle: "T-Shirt",
                    productBrand: "Exclusive Dream",
                    href: "#",
                    price: "1000",
                    quantity: "1",
                    sizes: "M",
                    color: "black",
                    category: "t-shirts",
                    imageUrl: ["https://firebasestorage.googleapis.com/v0/b/explore-crystalveey.appspot.com/o/travelPackages%2Fimages%20(1).jpeg?alt=media&token=1e40ad39-8299-4884-9b09-1a3f04233021"]
                }
            ],
        },
    ] as OrderType[]


    const [showPrompt, setShowPrompt] = useState(false);
    const [pickedStatus, setPickedStatus] = useState<any>("");
    const [text, setText] = useState("");
    const title = "Are you sure";

    useEffect(() => {
        if (showPrompt) {
            // show prompt here
            const result = window.confirm(`${title} ${text}`);
            if (result) {
                // change status here
                const newOrders = orders.map((order) => {
                    if (order.orderId === orders[0].orderId) {
                        order.orderStatus = pickedStatus;
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

    return (
        <main className="flex flex-col gap-10 max-w-4xl px-12 mx-auto">
            <h3 className="text-3xl font-bold">
                Orders
            </h3>
            <div>
                <div className="space-y-20">
                    {orders.map((order) => (
                        <div key={order.orderId}>
                            <h3 className="sr-only">
                                Order placed on <time dateTime={order.orderDate}>{order.orderDate}</time>
                            </h3>

                            <table className="mt-4 w-full text-gray-500 sm:mt-6">
                                <caption className="sr-only">Products</caption>
                                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                                    <tr>
                                        <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                                            Product
                                        </th>
                                        <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                            Price $
                                        </th>
                                        <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                                            Customer
                                        </th>
                                        <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                                            Status
                                        </th>
                                        <th scope="col" className="w-0 py-3 text-right font-normal">
                                            Info
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                                    {order.orderItems.map((product) => (
                                        <tr key={product.productId}>
                                            <td className="py-6 pr-8">
                                                <div className="flex items-center">
                                                    <img
                                                        src={product.imageUrl[0]}
                                                        alt={product.productTitle}
                                                        className="mr-6 h-16 w-16 rounded object-cover object-center"
                                                    />
                                                    <div>
                                                        <div className="font-medium text-gray-900">{product.productTitle}</div>
                                                        <div className="mt-1 sm:hidden">{product.productBrand}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">${product.price}</td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">
                                                <div className="flex flex-col gap-1">
                                                    <p>{order.customerName}</p>
                                                    <p>{order.customerEmail}</p>
                                                </div>
                                            </td>
                                            <td className="hidden py-6 pr-8 sm:table-cell">{order.orderStatus}</td>
                                            <td className="whitespace-nowrap py-6 text-right font-medium">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(true)}
                                                    className="text-indigo-600">
                                                    View<span className="hidden lg:inline"> Product</span>
                                                    <span className="sr-only">, {product.productTitle}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
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
                                <Dialog.Panel className="w-full max-w-md h-96  transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-hidden overflow-y-auto"
                                >
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
                                            <span className="font-semibold">Product Title:</span> T-Shirt
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Product Brand:</span> Exclusive Dream
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            <span className="font-semibold">Product Price:</span> $1000
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
        </main >
    )
}

