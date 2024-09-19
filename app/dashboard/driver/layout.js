"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  TransitionChild,
} from "@headlessui/react";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { logo } from "@/public/images/webp";
import Image from "next/image";
import Link from "next/link";
import {
  Logout,
  Home2,
  Location,
  Truck,
  Message,
  Notification,
  HambergerMenu,
  CloseCircle,
  Money,
} from "iconsax-react";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Home", href: "#", icon: Home2, current: true },
  { name: "Orders", href: "#", icon: Truck, current: false },
  { name: "Earnings", href: "#", icon: Money, current: false },
  { name: "Messages", href: "#", icon: Message, current: false },
];

const userNavigation = [
  { name: "Profile", href: "#" },
  { name: "Sign out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function RootLayout({ children }) {
  const router = useRouter();

  const logout = () => {
    localStorage.clear();
    router.push("/auth/login");
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <section>
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 flex">
          <DialogPanel
            transition
            className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
          >
            <TransitionChild>
              <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                <button
                  type="button"
                  onClick={() => setSidebarOpen(false)}
                  className="-m-2.5 p-2.5"
                >
                  <span className="sr-only">Close sidebar</span>
                  <CloseCircle
                    variant="Broken"
                    aria-hidden="true"
                    className="h-6 w-6 text-white"
                  />
                </button>
              </div>
            </TransitionChild>
            {/* Sidebar component, swap this element with another sidebar if you like */}
            <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
              <div className="flex h-16 shrink-0 items-center">
                <Image
                  alt="Farm Riders Logo"
                  src={logo}
                  className="h-8 w-auto"
                />
              </div>
              <nav className="flex flex-1 flex-col">
                <ul role="list" className="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" className="-mx-2 space-y-1">
                      {navigation.map((item) => (
                        <li key={item.name}>
                          <a
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-gray-50 text-primary"
                                : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                              "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                            )}
                          >
                            <item.icon
                              aria-hidden="true"
                              className={classNames(
                                item.current
                                  ? "text-primary"
                                  : "text-gray-400 group-hover:text-primary",
                                "h-6 w-6 shrink-0"
                              )}
                            />
                            {item.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                  <li className="mt-auto">
                    <button
                      onClick={logout}
                      className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary w-full"
                    >
                      <Logout
                        aria-hidden="true"
                        className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"
                      />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Image alt="Farm Riders Logo" src={logo} className="h-8 w-auto" />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-50 text-primary"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primary",
                          "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6"
                        )}
                      >
                        <item.icon
                          aria-hidden="true"
                          variant="Bold"
                          className={classNames(
                            item.current
                              ? "text-primary"
                              : "text-gray-400 group-hover:text-primary",
                            "h-6 w-6 shrink-0"
                          )}
                        />
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="mt-auto">
                <button
                  onClick={logout}
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-primary w-full"
                >
                  <Logout
                    aria-hidden="true"
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-primary"
                  />
                  Logout
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="lg:pl-72">
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
          >
            <span className="sr-only">Open sidebar</span>
            <HambergerMenu
              variant="Broken"
              aria-hidden="true"
              className="h-6 w-6"
            />
          </button>

          {/* Separator */}
          <div aria-hidden="true" className="h-6 w-px bg-gray-200 lg:hidden" />

          <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
            <div className="relative flex flex-1 w-full"></div>
            <div className="flex items-center gap-x-4 lg:gap-x-6">
              <button
                type="button"
                className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">View notifications</span>
                <Notification
                  variant="Bold"
                  aria-hidden="true"
                  className="h-6 w-6"
                />
              </button>

              {/* Separator */}
              <div
                aria-hidden="true"
                className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
              />

              {/* Profile dropdown */}
              <Menu as="div" className="relative">
                <MenuButton className="-m-1.5 flex items-center p-1.5">
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    className="h-8 w-8 rounded-full bg-gray-50"
                  />
                  <span className="hidden lg:flex lg:items-center">
                    <span
                      aria-hidden="true"
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                    >
                      James
                    </span>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="ml-2 h-5 w-5 text-gray-400"
                    />
                  </span>
                </MenuButton>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        href={item.href}
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10 lg:ml-[20%]">
        <div className="px-4 sm:px-6 lg:px-8">{children}</div>
      </div>
    </section>
  );
}
