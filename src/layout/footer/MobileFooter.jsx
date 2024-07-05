"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { FiAlignLeft, FiHome, FiShoppingCart, FiUser } from "react-icons/fi";
import { useCart } from "react-use-cart";

//internal import
import CategoryDrawer from "@components/drawer/CategoryDrawer";
import { SidebarContext } from "@context/SidebarContext";
import getCookieData from "@utils/getCookieData";

const MobileFooter = () => {
  const router = useRouter();

  // custom hook
  const { userInfo } = getCookieData();

  // react hook
  const [error, setError] = useState(null);

  const { totalItems } = useCart();
  const { toggleCartDrawer, toggleCategoryDrawer } = useContext(SidebarContext);

  return (
    <>
      <div className="flex flex-col h-full justify-between align-middle bg-white rounded cursor-pointer overflow-y-scroll flex-grow scrollbar-hide w-full">
        <CategoryDrawer className="w-6 h-6 drop-shadow-xl" />
      </div>

      <footer className="lg:hidden fixed z-30 bottom-0 bg-gray-800 flex items-center justify-between w-full h-16 px-3 sm:px-10 footer">
        <button
          aria-label="Bar"
          onClick={toggleCategoryDrawer}
          className="flex items-center justify-center flex-shrink-0 h-auto relative focus:outline-none"
        >
          <span className="text-xl text-white">
            <FiAlignLeft className="w-6 h-6 drop-shadow-xl" />
          </span>
        </button>

        <Link
          href="/"
          className="text-xl text-white hover:text-white"
          rel="noreferrer"
          aria-label="Home"
        >
          <FiHome className="w-6 h-6 drop-shadow-xl hover:text-white" />
        </Link>

        <button
          onClick={toggleCartDrawer}
          className="h-9 w-9 relative whitespace-nowrap inline-flex items-center justify-center text-white text-lg"
        >
          <span className="absolute z-10 top-0 right-0 inline-flex items-center justify-center p-1 h-5 w-5 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 bg-red-500 rounded-full">
            {totalItems}
          </span>
          <FiShoppingCart className="w-6 h-6 drop-shadow-xl hover:text-white" />
        </button>

        <button
          aria-label="User"
          type="button"
          className="text-xl text-white hover:text-white indicator justify-center"
        >
          {userInfo?.image && !error ? (
            <span
              onClick={() => router.push("/user/dashboard")}
              className="relative top-1 w-6 h-6 hover:text-white"
            >
              <Image
                width={29}
                height={29}
                onError={setError}
                src={userInfo.image}
                alt="user"
                className="rounded-full"
              />
            </span>
          ) : userInfo?.name ? (
            <span
              onClick={() => router.push("/user/dashboard")}
              className="leading-none font-bold font-serif block hover:text-white"
            >
              {userInfo?.name[0]}
            </span>
          ) : (
            <Link href={"/login"}>
              <FiUser className="w-6 h-6 drop-shadow-xl hover:text-white" />
            </Link>
          )}
        </button>
      </footer>
    </>
  );
};

export default MobileFooter;
