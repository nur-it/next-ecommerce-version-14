"use client";
import { useContext, useEffect, useState } from "react";
import { FiBell, FiShoppingCart } from "react-icons/fi";
import { useCart } from "react-use-cart";

// Internal imports
import CartDrawer from "@components/drawer/CartDrawer";
import { SidebarContext } from "@context/SidebarContext";

const NotifyIcon = ({ currency }) => {
  const { totalItems } = useCart();
  const [isHydrated, setIsHydrated] = useState(false);

  const { cartDrawerOpen, setCartDrawerOpen } = useContext(SidebarContext);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return (
    <>
      <CartDrawer
        currency={currency}
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
      />

      <button
        type="button"
        aria-label="Notification"
        className="relative flex-shrink-0 rounded-full text-gray-200 p-1 mx-2 hover:text-white focus:outline-none"
      >
        <FiBell className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* <button
        type="button"
        aria-label="Light mode"
        className="relative flex-shrink-0 rounded-full text-gray-200 p-1 mx-2 hover:text-white focus:outline-none"
      >
        <FiSun className="h-6 w-6" aria-hidden="true" />
      </button> */}
      <button
        type="button"
        aria-label={isHydrated ? `Cart with ${totalItems} items` : "Cart"}
        onClick={() => setCartDrawerOpen(!cartDrawerOpen)}
        className="relative flex-shrink-0 rounded-full text-gray-200 p-1 mx-2 hover:text-white focus:outline-none"
      >
        {isHydrated && totalItems > 0 && (
          <span className="absolute z-10 top-0 -right-4 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
            {totalItems}
          </span>
        )}
        <FiShoppingCart className="h-6 w-6" aria-hidden="true" />
      </button>
      <span className="mx-4 h-6 w-px bg-gray-200 lg:mx-6" aria-hidden="true" />
    </>
  );
};

export default NotifyIcon;
