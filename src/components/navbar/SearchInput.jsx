"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";

//internal imports
import useUtilsFunction from "@hooks/useUtilsFunction";
import { getShowingStoreProducts } from "@services/ProductServices";
import { notifyError } from "@utils/toast";

const SearchInput = () => {
  const router = useRouter();
  // custom hook
  const { showingTranslateValue } = useUtilsFunction();

  // react hook
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchDataShow, setSearchDataShow] = useState(true);

  // handle Search product title
  const handleSearchProduct = async (search) => {
    try {
      if (search.length > 0) {
        setSearchText(search);
        setSearchDataShow(true);

        const { products } = await getShowingStoreProducts({
          category: "",
          title: search,
        });

        const masterProduct = products?.filter(
          (product) =>
            (product.masterProduct.length !== 0 &&
              product.isMasterProduct === false) ||
            product.isMasterProduct === true
        );

        setProducts(masterProduct);
      } else {
        setProducts([]);
        setSearchText("");
        setSearchDataShow(false);
      }
    } catch (err) {
      notifyError(err ? err.response.data.message : err.message);
      console.log("error when search product", err);
    }
  };

  // handle search set to empty
  const handleSearchProductClick = (text) => {
    setSearchText(text);
    setSearchDataShow(false);

    if (text) {
      router.push(`/search?title=${text.toLowerCase().replace(/\s/g, "-")}`);
    } else {
      router.push(`/ `, null, { scroll: false });
    }
  };

  // handle search submit
  const handleSubmit = (e) => {
    e.preventDefault();

    setSearchDataShow(false);
    if (searchText) {
      router.push(
        `/search?title=${searchText.toLowerCase().replace(/\s/g, "-")}`
      );
    } else {
      router.push(`/ `, null, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col mx-auto w-full relative">
      <form
        onSubmit={handleSubmit}
        className="relative pr-12 md:pr-14 bg-white overflow-hidden shadow-sm rounded-md w-full"
      >
        <label className="flex items-center py-0.5 w-full">
          <input
            onChange={(e) => handleSearchProduct(e.target.value)}
            value={searchText}
            className="form-input w-full pl-5 appearance-none transition ease-in-out border text-input text-sm font-sans rounded-md min-h-10 h-10 duration-200 bg-white focus:ring-0 outline-none border-none focus:outline-none placeholder-gray-500 placeholder-opacity-75"
            placeholder="Search for products (e.g. shirt, pant)"
          />
        </label>
        <button
          aria-label="Search"
          type="submit"
          className="outline-none text-xl text-gray-400 absolute top-0 right-0 w-12 md:w-14 h-full flex items-center justify-center transition duration-200 ease-in-out hover:text-heading focus:outline-none"
        >
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </form>
      {/* auto complete search data show */}
      {products?.length !== 0 && searchDataShow && (
        <div
          className="absolute bg-white max-h-56 w-full border border-gray-200 rounded-br overflow-y-scroll rounded-bl py-1 z-30"
          style={{ top: "100%" }}
        >
          {products?.slice(0, 10).map((product, index) => (
            <div
              onClick={(e) => handleSearchProductClick(e.target.innerText)}
              className="px-3 py-1 cursor-pointer hover:bg-green-300 text-base font-medium"
              key={index + 1}
            >
              {showingTranslateValue(product?.title)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
