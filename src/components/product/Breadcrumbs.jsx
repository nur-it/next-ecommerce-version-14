"use client";
import useUtilsFunction from "@hooks/useUtilsFunction";
import Link from "next/link";
import { FiChevronRight } from "react-icons/fi";

const Breadcrumbs = ({ product }) => {
  const { showingTranslateValue } = useUtilsFunction();

  // category name slug
  const category_name =
    product?.category &&
    showingTranslateValue(product?.category?.name)
      ?.toLowerCase()
      ?.replace(/[^A-Z0-9]+/gi, "-");

  return (
    <ol className="flex items-center w-full overflow-hidden font-serif">
      <li className="text-sm pr-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold">
        <Link href="/">Home</Link>
      </li>

      <li className="text-sm mt-[1px]">
        {" "}
        <FiChevronRight />{" "}
      </li>
      <li className="text-sm pl-1 transition duration-200 ease-in cursor-pointer hover:text-emerald-500 font-semibold ">
        <Link
          href={`/search?category=${category_name}&_id=${product?.category?._id}`}
        >
          <button type="button">{category_name}</button>
        </Link>
      </li>
      <li className="text-sm mt-[1px]">
        {" "}
        <FiChevronRight />{" "}
      </li>
      <li className="text-sm px-1 transition duration-200 ease-in ">
        {showingTranslateValue(product?.title)}
      </li>
    </ol>
  );
};

export default Breadcrumbs;
