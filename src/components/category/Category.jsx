"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

//internal import
import CategoryCard from "@components/category/CategoryCard";
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getShowingCategory } from "@services/CategoryServices";
import { pages } from "@utils/data";

const Category = () => {
  const cname = window.location.host.split(".")[0];

  const { categoryDrawerOpen, closeCategoryDrawer } =
    useContext(SidebarContext);

  const { showingTranslateValue } = useUtilsFunction();
  // react hook
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getShowingCategory({ cname })
      .then((res) => {
        setData(res?.categories);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [cname]);

  return (
    <div className="flex flex-col w-full h-full bg-white cursor-pointer scrollbar-hide">
      {categoryDrawerOpen && (
        <div className="w-full flex justify-between items-center h-16 px-6 py-4 bg-gray-800 text-white border-b border-gray-100">
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center">
            <Link href="/" className="mr-10">
              {!loading && !error && (
                <Image
                  width={150}
                  height={43}
                  src={
                    data[0]?.header_logo
                      ? data[0]?.header_logo
                      : "/logo/cc-logo.png"
                  }
                  alt="logo"
                  className="object-contain"
                />
              )}
            </Link>
          </h2>

          <button
            onClick={closeCategoryDrawer}
            className="flex text-xl items-center justify-center w-8 h-8 rounded-full bg-gray-50 text-red-500 p-2 focus:outline-none transition-opacity hover:text-red-600"
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      )}

      <div className="overflow-y-scroll scrollbar-hide w-full max-h-full">
        {categoryDrawerOpen && (
          <h2 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
            All Categories
          </h2>
        )}
        {error ? (
          <p className="flex justify-center align-middle items-center m-auto text-xl text-red-500">
            <span> {error}</span>
          </p>
        ) : data.length === 0 ? (
          <Loading loading={loading} />
        ) : (
          <div className="relative grid gap-2 p-6">
            {data[0]?.children?.map((category) => (
              <CategoryCard
                key={category._id}
                id={category._id}
                title={showingTranslateValue(category?.name)}
                icon={category.icon}
                nested={category.children}
              />
            ))}
          </div>
        )}

        {categoryDrawerOpen && (
          <div className="relative grid gap-2 mt-5">
            <h3 className="font-semibold font-serif text-lg m-0 text-heading flex align-center border-b px-8 py-3">
              Pages
            </h3>
            <div className="relative grid gap-1 p-6">
              {pages.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  className="p-2 flex font-serif items-center rounded-md hover:bg-gray-50 w-full hover:text-emerald-600"
                >
                  <item.icon
                    className="flex-shrink-0 h-4 w-4"
                    aria-hidden="true"
                  />
                  <p className="inline-flex items-center justify-between ml-2 text-sm font-medium w-full hover:text-emerald-600">
                    {item.title}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;
