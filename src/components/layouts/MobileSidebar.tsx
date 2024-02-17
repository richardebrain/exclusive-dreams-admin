"use client";
import { Transition, Dialog, Disclosure } from "@headlessui/react";
import React, { Fragment, useState } from "react";
import { navigation, uis } from "@/utils/navigations";
import {
  Bars3Icon,
  ChevronUpIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { logOutActions } from "@/redux/admin.slice";
import { auth } from "@/utils/firebase";
import { useAppDispatch } from "@/redux/type";
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const MobileSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const dispatch = useAppDispatch();
  return (
    <div>
      {" "}
      {/* mobile sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                  <div className="flex h-16 shrink-0 items-center">
                    <Image
                      className="h-8 w-auto"
                      src="/logo.png"
                      alt="Excusive Dreams"
                      width={32}
                      height={32}
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              {!item.children ? (
                                <Link
                                  href={item.href}
                                  className={classNames(
                                    item.href === pathname
                                      ? "bg-gray-800 text-white"
                                      : "text-gray-400 hover:text-white hover:bg-gray-800",
                                    "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                  )}
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </Link>
                              ) : (
                                <Disclosure>
                                  {({ open }: { open: boolean }) => (
                                    <>
                                      <Disclosure.Button
                                        className={classNames(
                                          item.current
                                            ? "bg-gray-800 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                                          "group w-full flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                        )}
                                      >
                                        <div className="flex items-center gap-x-3">
                                          <item.icon
                                            className="h-6 w-6 shrink-0"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </div>
                                        <ChevronUpIcon
                                          className={`${
                                            open ? "rotate-180 transform" : ""
                                          } h-5 w-5 text-purple-500`}
                                        />
                                      </Disclosure.Button>
                                      <Disclosure.Panel className="">
                                        <ul
                                          role="list"
                                          className="flex flex-col gap-y-2 pl-9"
                                        >
                                          {item.children.map((child) => (
                                            <li key={child.name}>
                                              <Link
                                                href={child.href}
                                                className={classNames(
                                                  child.href === pathname
                                                    ? "bg-gray-800 text-white"
                                                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                                )}
                                              >
                                                <child.icon
                                                  className="h-6 w-6 shrink-0"
                                                  aria-hidden="true"
                                                />
                                                <span className="truncate">
                                                  {child.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </Disclosure.Panel>
                                    </>
                                  )}
                                </Disclosure>
                              )}
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li>
                        <div className="text-xs font-semibold leading-6 text-gray-400">
                          Your Uis
                        </div>
                        <ul role="list" className="-mx-2 mt-2 space-y-1">
                          {uis.map((ui) => (
                            <li key={ui.name}>
                              <Link
                                href={ui.href}
                                className={classNames(
                                  ui.current
                                    ? "bg-gray-800 text-white"
                                    : "text-gray-400 hover:text-white hover:bg-gray-800",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                  {ui.initial}
                                </span>
                                <span className="truncate">{ui.name}</span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
      {/* mobile header */}
      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-gray-400 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
        <div className="flex-1 text-sm font-semibold leading-6 text-white">
          Dashboard
        </div>
        <div className="flex gap-6  items-center justify-center">
          <span className="sr-only">Your profile</span>
          <Image
            className="h-8 w-8 rounded-full bg-gray-800"
            src="/user-logo.png"
            alt=""
            width={32}
            height={32}
          />
          <button
            onClick={() => {
              dispatch(logOutActions());
              auth.signOut();
            }}
            className="text-white font-semibold"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;
