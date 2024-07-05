"use client";
// import Drawer from "rc-drawer";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
// internal imports
// import Category from "@components/category/Category";
import Category from "@components/category/Category";
import { SidebarContext } from "@context/SidebarContext";

const CategoryDrawer = () => {
  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);

  return (
    <>
      <Transition.Root show={categoryDrawerOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-40"
          onClose={closeCategoryDrawer}
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 left-0 flex max-w-full pr-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-200"
                  enterFrom="-translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-200"
                  leaveFrom="translate-x-0"
                  leaveTo="-translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <Category />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default CategoryDrawer;
