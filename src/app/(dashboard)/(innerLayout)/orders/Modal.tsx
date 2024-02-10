import { StatusDropDown } from "@/components/orders/StatusDropdown";
import { OrderType, ProductCheckoutType } from "@/utils/type";
import { convertUnix } from "@/utils/unixFormatter";
import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";

type ModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  orders: OrderType[];
  selected: {
    product: ProductCheckoutType;
    orderId: string;
    hasSize: boolean;
    userId: string;
  };
  setText: React.Dispatch<React.SetStateAction<string>>;
  setShowPrompt: React.Dispatch<React.SetStateAction<boolean>>;
  setPickedStatus: React.Dispatch<React.SetStateAction<any>>;
};
const Modal = ({
  isOpen,
  closeModal,
  orders,
  setText,
  setShowPrompt,
  setPickedStatus,
  selected,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  const orderIndex = orders.findIndex(
    (order) => order.orderId === selected.orderId
  );
  const product =
    orderIndex !== -1
      ? orders[orderIndex].cart.find((product) => {
          if (selected.hasSize) {
            return (
              product.productId === selected.product.productId &&
              product.size === selected.product.size
            );
          } else {
            return product.productId === selected.product.productId;
          }
        })
      : null;
  const orderItself = orders[orderIndex];
  console.log(orderItself, "orderItself");
  if (!product) return null;
  return (
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
              <Dialog.Panel className="w-full max-w-xl h-[500px]  transform rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all overflow-hidden overflow-y-auto">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Product Information
                </Dialog.Title>
                <div className="mt-2 flex flex-col gap-2">
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Order ID:</span>{" "}
                    {orderItself?.orderId}
                  </p>
                  <div className="my-4 flex gap-4 items-center">
                    <p className="text-gray-600">Update delivery Status :</p>
                    <StatusDropDown
                      order={orderItself}
                      setText={setText}
                      setShowPrompt={setShowPrompt}
                      setPickedStatus={setPickedStatus}
                    />
                  </div>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Product Title:</span>{" "}
                    {product?.productTitle}
                  </p>
                  <p className="text-sm text-gray-500">
                    {/* <span className="font-semibold">Product Brand:</span>{" "}
                    Exclusive Dream */}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Product Price:</span> $
                    {product?.price}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Shipping Fee:</span> $
                    {orderItself?.deliveryFee}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Product Quantity:</span>{" "}
                    {product?.quantity}
                  </p>
                  {product.hasSize && (
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Product Size:</span>{" "}
                      {product?.size}
                    </p>
                  )}
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Date Placed:</span>{" "}
                    {convertUnix(orderItself?.createdAt).formattedDate}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold">Payment:</span>{" "}
                    {orderItself.status === "succeeded"
                      ? "Payment Made"
                      : "Not Paid"}
                  </p>
                  <p className="text-sm text-gray-500">
                    <span className="font-semibold text-sm text-gray-500">
                      Total Amount:
                    </span>{" "}
                    ${orderItself.amount / 100}
                  </p>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Customer Name:</span>{" "}
                      {orderItself?.shipping.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Delivery Address:</span>{" "}
                      {orderItself?.shipping.address.line1},{" "}
                      {orderItself?.shipping.address.city},{" "}
                      {orderItself?.shipping.address.state},{" "}
                      {orderItself?.shipping.address.country},{" "}
                      {orderItself?.shipping.address.postal_code}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Customer Phone:</span>{" "}
                      {orderItself?.shipping.phone}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Email:</span>{" "}
                      {orderItself?.email}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center text-gray-500">
                      <p className="text-sm font-bold">Order Status: </p>{" "}
                      {orderItself?.deliveryStatus === "shipped" && (
                        <p className="text-sm text-gray-500"> Order Shipped</p>
                      )}
                      {orderItself?.deliveryStatus === "delivered" && (
                        <p className="text-sm text-gray-500">
                          {" "}
                          Order Delivered
                        </p>
                      )}
                      {orderItself?.deliveryStatus === "processing" && (
                        <p className="text-sm text-gray-500"> Order Processing</p>
                      )}
                      {orderItself?.deliveryStatus === "cancelled" && (
                        <p className="text-sm text-gray-500">
                          {" "}
                          Order Cancelled
                        </p>
                      )}
                      {orderItself?.deliveryStatus === "order placed" && (
                        <p className="text-sm text-gray-500"> Order Placed</p>
                      )}
                    </div>
                  </div>
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
  );
};

export default Modal;
