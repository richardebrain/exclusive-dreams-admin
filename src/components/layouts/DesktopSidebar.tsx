"use client";
import { navigation, teams } from "@/utils/navigations";
import Link from "next/link";
import React from "react";
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { usePathname } from "next/navigation";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
const DesktopSidebar = () => {
  const pathname = usePathname()
  return (
    <div>
      {" "}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
          <div className="flex h-16 shrink-0 items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
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
                              <Disclosure.Button className={classNames(
                                item.current
                                  ? "bg-gray-800 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800",
                                "group w-full flex justify-between gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                              )}>
                                <div className="flex items-center gap-x-3">
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </div>
                                <ChevronUpIcon
                                  className={`${open ? 'rotate-180 transform' : ''
                                    } h-5 w-5 text-purple-500`}
                                />
                              </Disclosure.Button>
                              <Disclosure.Panel className="">
                                <ul role="list" className="flex flex-col gap-y-2 pl-9">
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
                  Your teams
                </div>
                <ul role="list" className="-mx-2 mt-2 space-y-1">
                  {teams.map((team) => (
                    <li key={team.name}>
                      <a
                        href={team.href}
                        className={classNames(
                          team.current
                            ? "bg-gray-800 text-white"
                            : "text-gray-400 hover:text-white hover:bg-gray-800",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                          {team.initial}
                        </span>
                        <span className="truncate">{team.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="-mx-6 mt-auto">
                <a
                  href="#"
                  className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                >
                  <img
                    className="h-8 w-8 rounded-full bg-gray-800"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                  <span className="sr-only">Your profile</span>
                  <span aria-hidden="true">Tom Cook</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default DesktopSidebar;