"use client";
import useTranslation from "next-translate/useTranslation";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useState } from "react";

// internal imports
import Loading from "@components/preloader/Loading";
import { SidebarContext } from "@context/SidebarContext";
import ProductCard from "./ProductCard";

const ProductList = ({
  products,
  attributes,
  storeSetting,
  localizationSettings,
}) => {
  const { t } = useTranslation();
  const router = useRouter();
  const searchPath = useSearchParams();

  const _id = searchPath.get("_id");
  const sort = searchPath.get("sort");
  const category = searchPath.get("category");

  const { isLoading, setIsLoading } = useContext(SidebarContext);

  // react hook
  const [visibleProduct, setVisibleProduct] = useState(18);
  const [productData, setProductData] = useState([]);

  // handle product sorting data
  const handleProductSorting = (data) => {
    const url = `/search?category=${category}&_id=${_id}&sort=${data}`;

    router.push(url);
  };

  // handle product more loading
  const handleProductMoreLoading = () => {
    const url = `/search?category=${category}&_id=${_id}&sort=${sort}&limit=${
      visibleProduct + 10
    }`;
    router.push(url);

    setVisibleProduct((pre) => pre + 10);
  };

  // master product filtering
  useEffect(() => {
    setIsLoading(false);

    const masterProduct = products?.filter(
      (product) =>
        (product.masterProduct.length !== 0 &&
          product.isMasterProduct === false) ||
        product.isMasterProduct === true
    );

    setProductData(masterProduct);
  }, [products]);

  return (
    <>
      {productData?.length !== 0 && (
        <div className="flex justify-between mt-3 mb-6 bg-orange-100 border border-gray-100 rounded p-3">
          <h6 className="text-sm font-serif">
            {t("common:totalI")}{" "}
            <span className="font-bold">{productData?.length}</span>{" "}
            {t("common:itemsFound")}
          </h6>

          <span className="text-sm font-serif">
            <select
              onChange={(e) => handleProductSorting(e.target.value)}
              className="py-0 text-sm font-serif font-medium block w-full rounded border-0 bg-white pr-10 cursor-pointer focus:ring-0"
            >
              <option className="px-3" value="All" defaultValue hidden>
                {t("common:sortByPrice")}
              </option>
              <option className="px-3" value="low-to-high">
                {t("common:lowToHigh")}
              </option>
              <option className="px-3" value="high-to-low">
                {t("common:highToLow")}
              </option>
              <option className="px-3" value="alphabetically">
                {t("common:alphabetically")}
              </option>
              <option className="px-3" value="best-selling">
                {t("common:bestSellingItems")}
              </option>
            </select>
          </span>
        </div>
      )}

      {isLoading ? (
        <Loading loading={isLoading} />
      ) : productData?.length === 0 ? (
        <div className="text-center align-middle mx-auto p-5 my-5">
          <Image
            className="my-4 mx-auto"
            src="/no-result.svg"
            alt="no-result"
            width={400}
            height={380}
          />
          <h2 className="text-lg md:text-xl lg:text-2xl xl:text-2xl text-center mt-2 font-medium font-serif text-gray-600">
            {t("common:sorryText")} 😞
          </h2>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-2 md:gap-3 lg:gap-3">
            {productData?.slice(0, visibleProduct).map((product, i) => (
              <ProductCard
                key={i + 1}
                product={product}
                attributes={attributes}
                storeSetting={storeSetting}
                localizationSettings={localizationSettings}
              />
            ))}
          </div>

          {productData?.length > visibleProduct && (
            <button
              onClick={handleProductMoreLoading}
              className="w-auto mx-auto md:text-sm leading-5 flex items-center transition ease-in-out duration-300 font-medium text-center justify-center border-0 border-transparent rounded-md focus-visible:outline-none focus:outline-none bg-indigo-100 text-gray-700 px-5 md:px-6 lg:px-8 py-2 md:py-3 lg:py-3 hover:text-white hover:bg-gray-900 h-12 mt-6 text-sm lg:text-sm"
            >
              {t("common:loadMoreBtn")}
            </button>
          )}
        </>
      )}
    </>
  );
};

export default ProductList;
