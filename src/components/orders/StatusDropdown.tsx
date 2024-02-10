import { OrderType } from "@/utils/type";
import { Popover, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { orderByKey } from "firebase/database";
import { Fragment } from "react";

const deliveryStatusOption = [
  { name: "Order Placed", value: "order placed" },
  { name: "Processing", value: "processing" },
  { name: "Shipped", value: "shipped" },
  { name: "Delivered", value: "delivered" },
  { name: "Cancelled", value: "cancelled" },
];

export const StatusDropDown = ({
  order,
  setText,
  setShowPrompt,
  setPickedStatus,
}: {
  order: OrderType;
  setText: any;
  setShowPrompt: any;
  setPickedStatus: any;
}) => {
  const handleClick = ({ status }: { status: string }) => {
    if (order?.deliveryStatus === status) {
      return;
    }
    setShowPrompt(true);
    setPickedStatus(status);
    setText(`you want to change the status of this order to "${status}" ?`);
  };

  return (
    <div className="max-w-sm">
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
                ${open ? "" : ""}
                group inline-flex items-center rounded-md  px-3 py-2 text-sm font-bold border border-[rgba(145,158,171,0.32)] transition duration-200 ease-out hover:bg-[rgba(145,158,171,0.08)] hover:border-[#000000]`}
            >
              <p className="capitalize">
                {order?.deliveryStatus === "order placed" && (
                  <span>Order Placed</span>
                )}
                {order?.deliveryStatus === "cancelled" && (
                  <span>Cancelled</span>
                )}
                {order?.deliveryStatus === "processing" && <span>Processing</span>}
                {order?.deliveryStatus === "shipped" && <span>Shipped</span>}
                {order?.deliveryStatus === "delivered" && (
                  <span>Delivered</span>
                )}
              </p>
              <ChevronDownIcon
                className={`${open ? "" : ""}
                  ml-2 h-5 w-5 transition duration-150 ease-in-out group-hover:text-black`}
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute left-20 z-10 mt-3 w36 -translate-x-1/2 transform px-4 sm:px-0">
                <div
                  className="overflow-hidden min-w-[140px] rounded-lg shadow-lg ring-1 ring-black/5"
                  style={{
                    boxShadow:
                      "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
                  }}
                >
                  <div className="relative grid gap-1 bg-white p-1 bg-gradient-to-bl from-purple-50 via-white to-green-50 transform transition-transform duration-500 ease-out">
                    {deliveryStatusOption.map((item) => (
                      <button
                        key={item.value}
                        onClick={() => {
                          handleClick({ status: item.value });
                        }}
                        className={`-m3 flex items-center rounded-md p-2 transition duration-150 ease-in-out hover:bg-gray-100 ${
                          order?.deliveryStatus === item.value
                            ? "bg-[rgba(145,158,171,0.16)] font-bold"
                            : ""
                        }`}
                      >
                        <p className="capitalize text-sm text-[rgb(33,43,54)]">
                          {item.name}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};
